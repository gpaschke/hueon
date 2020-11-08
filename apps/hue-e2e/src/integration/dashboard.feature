@smoke
Feature: Dashboard

  Setup: I open the app and see the dashboard
  This is done before every scenario!

  Background:
    Given is an opened "dashboard"

  @tms("#123","PRO-123")
  @severity("critical")
  Scenario: Open as happy flow
    As a Customer
    I want to open the dashboard
    To see a greeting

    When  I do something specific
    Then  I see something specific

  @tms("#1234","PRO-1234")
  @visualRegression
  Scenario: Open with error
  As a Customer
  I want to know the issue
  If something went wrong

    When  I do something specific

