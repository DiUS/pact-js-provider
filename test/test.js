"use strict"

import chai from 'chai'
chai.should()
let expect = chai.expect

describe('my simple test', () => {

  it('should be true', () => {
    let subject = 1

    subject.should.equal(1)
  })
})

