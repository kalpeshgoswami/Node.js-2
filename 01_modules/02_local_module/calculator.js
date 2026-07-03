function addition(x, y) {
    return x + y;
}

function subtraction(x, y) {
    return x - y;
}

function multiplication(x, y) {
    return x * y;
}

function division(x, y) {
    if (y === 0) {
        return "Cannot divide by zero";
    }
    return x / y;
}

function modulo(x, y) {
    if (y === 0) {
        return "Cannot perform modulo by zero";
    }
    return x % y;
}

export {
    addition,
    subtraction,
    multiplication,
    division,
    modulo
};