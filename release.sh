#!/bin/bash

clear
java -version

timeout=640000
casVersion=(`cat ./gradle.properties | grep "version" | cut -d= -f2`)

echo "***************************************************************"
echo "Welcome to the release process for Apereo CAS Management ${casVersion}"
echo "***************************************************************"

echo -e "Make sure the following criteria is met:\n"
echo -e "\t- Your Sonatype account (username/password) must be authorized to publish releases to 'org.apereo'."
echo -e "\t- Your PGP signatures must be configured to sign the release artifacts apriori."
echo -e "\t\tsigning.keyId=YOUR_KEY_ID"
echo -e "\t\tsigning.password=YOUR_KEY_PASSWORD"
echo -e "\t\tsigning.secretKeyRingFile=/path/to/.gnupg/secring.gpg"
echo -e "\t- Disable the Gradle daemon and parallel processing via properties '~/.gradle/gradle.properties'."
echo -e "\t\torg.gradle.daemon=false"
echo -e "\t\torg.gradle.parallel=false"
echo -e "\nFor more information, please visit https://apereo.github.io/cas/developer/Release-Process.html\n"

read -s -p "If you are ready, press ENTER to continue..." anykey

username="${SONATYPE_USERNAME}"
password="${SONATYPE_PASSWORD}"

clear
echo -e "\nBuilding CAS Management. Please be patient as this might take a while..."
./gradlew clean
./gradlew assemble -x test -x check -DpublishReleases=true \
-DsonatypeUsername="${username}" -DsonatypePassword="${password}"

echo -e "\nPublishing CAS. Please be patient as this might take a while..."
./gradlew publishToSonatype closeAndReleaseStagingRepository -DpublishReleases=true \
	--no-parallel -DsonatypeUsername="${username}" -DsonatypePassword="${password}" \
	-Dorg.gradle.internal.http.socketTimeout="${timeout}" \
	-Dorg.gradle.internal.http.connectionTimeout="${timeout}"

echo -e "\nDone."
exit 0
