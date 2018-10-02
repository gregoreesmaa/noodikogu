FROM openjdk:10-jre
VOLUME /tmp
ADD build/libs/sahtel-docker.jar app.jar
RUN sh -c 'touch /app.jar'

RUN apt-get update && apt-get install -y --no-install-recommends \
		inkscape \
		pdftk \
	&& rm -rf /var/lib/apt/lists/*

ENTRYPOINT [ "java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar","--spring.config.location=file:/conf/noodid.yaml" ]