#!/bin/bash

gradle="./gradlew $@"
gradleBuild=""
gradleBuildOptions="--build-cache --configure-on-demand --no-daemon -Dorg.gradle.internal.http.socketTimeout=160000 -Dorg.gradle.internal.http.connectionTimeout=160000 "

echo -e "***********************************************"
echo -e "Gradle build started at `date`"
echo -e "***********************************************"

if [[ "$casVersion" == *"-SNAPSHOT" ]]; then
  echo "Found changes that require snapshots to be published."
  runBuild=true
fi

if [ "$runBuild" = false ]; then
    echo -e "Gradle build will not run"
    exit 0
fi

echo -e "The build will deploy SNAPSHOT artifacts to Sonatype"
gradleBuild="$gradleBuild assemble publish -x test -x javadoc -x check \
            -DskipNpmLint=true \
            -DpublishSnapshots=true -DsonatypeUsername=${SONATYPE_USER} \
            -DsonatypePassword=${SONATYPE_PWD} --parallel "
            

echo -e "Installing NPM...\n"
./gradlew npmInstall --stacktrace -q --no-daemon

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
