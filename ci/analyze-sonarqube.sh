#!/bin/bash

gradle="./gradlew $@"
gradleBuild=""
gradleBuildOptions="--build-cache --configure-on-demand --no-daemon --parallel "

echo -e "***********************************************"
echo -e "Gradle build started at `date`"
echo -e "***********************************************"

echo -e "Installing NPM...\n"
./gradlew npmInstall --stacktrace -q --no-daemon

gradleBuild="$gradleBuild sonarqube -x javadoc -Dsonar.organization=apereo \
            -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=${SONARCLOUD_TOKEN} \
            -DskipGradleLint=true -DskipSass=true -DskipNestedConfigMetadataGen=true \
            -DskipNodeModulesCleanUp=true -DskipNpmCache=false --parallel "

tasks="$gradle $gradleBuildOptions $gradleBuild"
echo -e "***************************************************************************************"
echo $tasks
echo -e "***************************************************************************************"

eval $tasks
retVal=$?

echo -e "***************************************************************************************"
echo -e "Gradle build finished at `date` with exit code $retVal"
echo -e "***************************************************************************************"

if [ $retVal == 0 ]; then
    echo "Gradle build finished successfully."
    exit 0
else
    echo "Gradle build did NOT finish successfully."
    exit $retVal
fi
