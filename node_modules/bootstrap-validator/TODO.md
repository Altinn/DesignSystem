### TODO
##### v1.0
* Add support for overriding individual native error messages (#222)
* Allow custom error messages to be functions
* Refactor validators to optionally return promises. (#131) (#177) (#275)
* Add a class to the form to indicate validity state. (#260)
* Improve invalid/valid error events, add post-delay events.
  - [error/errored] [success/successed] in addition to [valid/invalid], upon displaying or clearing an error
  - add whether or not field is valid in [validated.bs.validator] event.detail
  - add events on `.validator('validate')`, including whole form validity in `event.detail`
  * ^ Add a way to reliably determine if form is valid or invalid upon submit. (#67)
* Change remote validator to use response body as error message.
* Defer remote validation while request is still pending. (#72)


###### Maybe
* Maybe DON'T not validate hidden invisible fields? (#134) (#115)

### DONE
* Fixed a bug with the form still submitting even with errors when using the `disable: false` option. (#310)
* Fixed a bug with the error field not being focused when using the `disable: false` option. (#310)