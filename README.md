# Schedula Backend Development

## Overview

This repository contains the backend development tasks completed as part of the Schedula Backend Internship Program.

The project is based on a healthcare appointment management system that enables patients to discover doctors, book appointments, manage schedules, and receive notifications.

## Tech Stack

* NestJS
* TypeScript
* PostgreSQL
* Git & GitHub
* Postman / Hoppscotch

## Completed Tasks

### Task 1: Project Setup

* Created and configured a NestJS application
* Verified successful local execution
* Established Git workflow using feature branches and Pull Requests

### Task 2: Product Flow Analysis

Reviewed the provided wireframes and analyzed the following system flows:

#### Patient Flow

* Registration & Login
* Find Doctor
* Book Appointment
* Reschedule Appointment
* Cancel Appointment
* Notifications
* Medical Records

#### Doctor Flow

* Registration
* Profile Management
* Availability Management
* Appointment Handling

### Task 3: ER Diagram Design

Designed an Entity Relationship Diagram based on the wireframe requirements.

#### Core Entities

* User
* Patient
* Doctor
* Appointment
* Slot
* Notification
* Medical Record

#### Key Relationships

* User ↔ Patient
* User ↔ Doctor
* Doctor ↔ Slot
* Patient ↔ Appointment
* Doctor ↔ Appointment
* User ↔ Notification
* Patient ↔ Medical Record

## Project Structure

```text
backend/
├── src/
├── test/
├── package.json
├── tsconfig.json
└── nest-cli.json
```

## Running the Project

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run start:dev
```

Application will be available at:

```text
http://localhost:3000
```

## Branching Strategy

Feature-based workflow is followed:

```text
feature/project-setup
feature/er-diagram
```

All changes are submitted through Pull Requests before merging into the main branch.

## Author

Vidya Prakash Pandey

Backend Developer Intern
