FROM openjdk:11-jre
VOLUME /tmp
ADD build/libs/sahtel-docker.jar app.jar
RUN sh -c 'touch /app.jar'
ENTRYPOINT [ "java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar","--spring.config.location=file:/conf/noodid.yaml" ]