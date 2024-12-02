FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /server

COPY server/pom.xml ./
RUN mvn dependency:go-offline

COPY server/ ./
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim

COPY --from=build /server/target/server-0.0.1-SNAPSHOT.jar server.jar

EXPOSE 8080


ENTRYPOINT ["java","-jar","server.jar"]
