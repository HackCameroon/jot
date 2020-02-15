function isGraphable(s){
    let calculator = Desmos.GraphingCalculator();
    calculator.setExpression({ id: 'graph1', latex: s});
    calculator.observe('expressionAnalysis', function() {
        let analysis = calculator.expressionAnalysis["graph1"];
        return analysis.isGraphable;
    });
}

function getGraphableParts(s){
    // to be implemented 
}

getGraphable("x=7");

// const keywords =    ["e", "pi", 
//                     "+", "-", "*", "/", "^",
//                     "sin", "cos", "tan", "cot", "sec", "csc",
//                     "arcsin", "arccos", "arctan", "arccot", "arcsec", "arccsc",
//                     "ln", "log", "sqrt",
//                     "x", "y"
//                     ];

// function getLatexParts(s){
//     s.includes("=")
// }