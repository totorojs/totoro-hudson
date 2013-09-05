all: jshint

jshint:
	@jshint lib/*.js
	@jshint bin/*.js


.PHONY: all jshint
