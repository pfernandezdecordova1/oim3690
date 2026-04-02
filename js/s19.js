function getGrade(score) {
    if (score >= 90) {
        return "A";
    } else if (score >= 60) {
        return "PASS";
    } else {
        return "FAIL";
    }
}

// second example

let result = getGrade(95);
console.log(result);


function square(x) {
    return x**2;
}

result = square(5);
console.log(result);

// Also we can use 

const add = (x, y) => x + y;
result = add(3, 4);
console.log(result);    
