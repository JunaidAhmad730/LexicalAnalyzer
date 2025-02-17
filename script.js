const keywords = new Set(["sin", "cos", "tan", "log", "ln", "exp", "sqrt"]);
        
function analyzeInput() {
    let input = document.getElementById("expression").value.trim();
    let outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    let delimiters = new Set(" +-*/%^(),;><=\"".split(""));
    let operators = new Set("+-*/%^=><".split(""));
    
    let tokens = [];
    let token = "";

    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        if (delimiters.has(char)) {
            if (token !== "") {
                tokens.push(classifyToken(token));
                token = "";
            }
            if (operators.has(char)) {
                tokens.push(`Token: Operator, Value: ${char}`);
            } else if (char === '(' || char === ')') {
                tokens.push(`Token: Parenthesis, Value: ${char}`);
            }
        } else {
            token += char;
        }
    }

    if (token !== "") {
        tokens.push(classifyToken(token));
    }

    if (tokens.length === 0) {
        outputDiv.innerHTML = "<p>No valid tokens found.</p>";
    } else {
        tokens.forEach(token => {
            let p = document.createElement("p");
            p.textContent = token;
            outputDiv.appendChild(p);
        });
    }
}

function classifyToken(token) {
    if (!isNaN(token)) {
        return `Token: Number, Value: ${token}`;
    } else if (/^[a-zA-Z]+$/.test(token)) {
        return keywords.has(token) ? `Token: Function, Value: ${token}` : `Token: Variable, Value: ${token}`;
    } else {
        return `Token: Unknown, Value: ${token}`;
    }
}
