# CPSC 410 Form Builder

## Overview

This project, developed for CPSC 410, is a versatile form builder designed to streamline the creation of various types 
of forms, including simple forms, quizzes, and dynamic forms that change based on previous answers. It aims to provide 
an intuitive interface for constructing complex forms without requiring extensive coding knowledge

## Features

- **Form Creation**: Easily create custom forms with a variety of input types.
- **Quiz Maker**: Design quizzes with automatic scoring and feedback.
- **Dynamic Forms**: Implement logic to create forms that adapt based on user responses, allowing for a tailored form-filling experience.
## Prerequisites

### JDK Version

This project is developed using JDK 21. It is essential to have JDK 21 installed and properly configured on your s
ystem to compile and run the application. If you do not have JDK 21, you can download it from 
[Oracle's official website](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html) 
or use a version manager like SDKMAN! or jEnv for easier management of multiple JDK versions.

#### Setting JAVA_HOME

Ensure that the `JAVA_HOME` environment variable is set to your JDK installation path. This is needed for Maven to 
compile the project.

## Getting Started

1. **Clone the repository**:
   git clone https://github.com/yourusername/cpsc410-form-builder.git
   cd cpsc410-form-builder
2. **Build the project** (ensure Maven is installed):
mvn clean install
3. **Run the application**:
   java -jar target/form-builder-1.0-SNAPSHOT.jar

## Code Formatting
Project uses google java format. Add the plugin in settings by searching. 
