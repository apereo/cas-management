eval './gradlew clean build publishToMavenLocal --configure-on-demand \
     --build-cache --parallel \
    -x test -x javadoc -x check --stacktrace \
    -DskipErrorProneCompiler=true \
    -DskipClientBuild=true \
    -DskipNestedConfigMetadataGen=true \
    -DskipBootifulArtifact=true'
