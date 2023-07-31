var assert = require("assert");

describe("Array", function () {
  context("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
    it("should return 2", function () {
      assert.equal([1, 2, 3].indexOf(3), 2);
    });
    it("should return 1", function () {
      assert.equal([1, 2, 3].indexOf(2), 1);
    });
    it("should return 0", function () {
      assert.equal([1, 2, 3].indexOf(1), 0);
    });
  });
});

function miniatureAlgorithm(s1, s2) {
  let sum = 0;
  let comparing = "";
  let reference = [];
  if (s1.length >= s2.length) {
    reference = s1.split("");
    comparing = s2;
  } else {
    reference = s2.split("");
    comparing = s1;
  }
  for (let i in comparing) {
    if (!reference.includes(comparing[i]))
      sum += comparing.charCodeAt(parseInt(i));
    else reference.splice(i, 0);
  }
  for (let i in reference) sum += reference.charCodeAt(parseInt(i));
  return sum;
}
