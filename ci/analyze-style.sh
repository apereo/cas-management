#!/bin/bash

gradle="./gradlew $@"
gradleBuild=""
gradleBuildOptions="--build-cache --configure-on-demand --no-daemon "

echo -e "***********************************************"
echo -e "Gradle build started at `date`"
echo -e "***********************************************"

echo -e "Installing NPM...\n"
./gradlew npmInstall --stacktrace -q --no-daemon

gradleBuild="$gradleBuild checkstyleMain checkstyleTest -x test -x javadoc \
     -DskipGradleLint=true -DskipSass=true -DskipNestedConfigMetadataGen=true \
     -DskipNodeModulesCleanUp=true -DskipNpmCache=true --parallel -DshowStandardStreams=true "
     
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
else
    echo "Gradle build did NOT finish successfully."
    exit $retVal
fi
