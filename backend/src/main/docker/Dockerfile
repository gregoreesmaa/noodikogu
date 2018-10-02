FROM openjdk:12-jdk-alpine
VOLUME /tmp
ADD build/libs/sahtel-docker.jar app.jar
RUN sh -c 'touch /app.jar'

RUN apk add --update \
    inkscape \
    pdftk \
  && rm -rf /var/cache/apk/*

ENTRYPOINT [ "java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar","--spring.config.location=file:/conf/noodid.yaml" ]