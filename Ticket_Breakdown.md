# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

####TASKS:

#####* 1- create new table facilities_agent adding a custom_id field (2 story points ~1 hour)*
- create table `facilities_agent` (DB)
- the composite key must be the combination of `facilities_id` and `agents_id` on `facilities_agent` table (DB)
- the `custom_id` must be a free text field (DB)
- the `custom_id` can be nullable (DB)
- create `FacilitiesAgent` model
- add `FacilitiesAgent` to Agent model

**Note:**
 - The field data will be something like "AGENTX-123"
 - The `custom_id` field is optional
 - the `facilities_id` and `agents_id` must not be null 


#####*2 - modify Agent CRUD endpoints (5 story points ~ 4 hours)*
- add `custom_id` property to request body on `POST - /facilities/agent`
- add `custom_id` property to request body on `PUT - /facilities/agent`
- add `custom_id` property to request body on `GET - /agent`
- modify test to check if the `custom_id` is being saved 
- modify test to check if the `custom_id` is being returned by the GET endpoint

**Note:**
 - The field data will be something like "AGENTX-123"
 - if the facility save/update the custom_id modify it on `facilities_agent` table
 - use the `facilities_id` / `agents_id` to filter the `facilities_agent` table
 - The `custom_id` field is optional
 - if the custom_id exists it must be returned by the Agent model

#####* 3- add custom_id field to agent metadata on getShiftsByFacility method  and a parameter to generate the report by Agent using the custom_id (3 story points ~3 hours)*
- modify the getShiftsByFacility to receive a new optional parameter to search by custom_id
- modify test to check if the id is being added on the list.
- create test to check if the search by id optional param is working.


**Note:**
 - The field data will be something like "AGENTX-123"
 - Use the `facilities_agent` table to retrieve the custom_id
 - - if the custom_id exists it must be returned by the Agent model
 - The `custom_id` field is optional

#####* 4- add custom_id field in PDF report on generateReport method (2 story points ~2 hours)*
- modify the facilities PDF template to add the new `custom_id` field
- create test to check if the id is being added on PDF.

**Note:**
 - The field data on template will be something like "ID: AGENTX-123"
 - The `custom_id` field is optional
 - if the custom_id exists it must be returned in the PDF


 ### **My notes:**
- I guessed that each facility will have its own id for each agent, so this is why I created the facilities_agent table, to add this custom fields on it
- I thought the Facilities must have endpoints to save this new custom_id so that's why I created tasks for it.
- Also I think the PDF is being generated on backend only, so this is why I didn't create any front end tasks.