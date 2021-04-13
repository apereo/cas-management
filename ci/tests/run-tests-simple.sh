#!/bin/bash


gradle="./gradlew $@"
gradleBuild=""
gradleBuildOptions="--stacktrace --build-cache --configure-on-demand --no-daemon "

echo -e "***********************************************"
echo -e "Gradle build started at `date`"
echo -e "***********************************************"

gradleBuild="$gradleBuild test jacocoRootReport --parallel -x javadoc -x check \
    -DskipNpmLint=true -DskipGradleLint=true -DskipSass=true -DskipNpmLint=true -DskipClientBuild=true \
    -DskipNpmCache=false -DskipNestedConfigMetadataGen=true "

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
    echo "Uploading test coverage results..."
    bash <(curl -s https://codecov.io/bash)
    echo "Gradle build finished successfully."
else
    echo "Gradle build did NOT finish successfully."
    exit $retVal
fi
