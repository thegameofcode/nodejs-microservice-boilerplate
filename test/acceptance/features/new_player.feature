# Automatically generated by Honest Code
# Do not edit this file as it will be overwritten

Feature: New player
  As an API client
  I want to create a new player

  Scenario: POST /player (verifies response)
    When I request to create a new player with following data
      | field    | value                 |
      | email    | kara.trace@domain.com |
      | fullname | Kara Trace            |
      | avatar   | http://kara.jpg       |
      | idp      | google                |
      | idp_id   | 1                     |
    Then the response status code is 201
    And the response body has an "id" field

  Scenario: POST /player (verifies creation data)
    When I request to create a new player with following data
      | field    | value                 |
      | email    | kara.trace@domain.com |
      | fullname | Kara Trace            |
      | avatar   | http://kara.jpg       |
      | idp      | google                |
      | idp_id   | 1                     |
    And I request to find a player with following search parameters
      | field  | value  |
      | idp    | google |
      | idp_id | 1      |
    Then the response body has a list field "items" with 1 length
    And the response body item 0 has a "id" field
    And the response body item 0 has a "creationDate" field
    And the response body item 0 has a "creatorId" field
    And the response body item 0 has a "fullname" field with "Kara Trace" value
    And the response body item 0 has a "email" field with "kara-trace@domain.com" value
    And the response body item 0 has a "avatar" field with "http://kara.jpg" value
    And the response body item 0 does not have a "idp" field