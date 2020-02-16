let spanHighlighter = rangy.createHighlighter();
let divHighlighter = rangy.createHighlighter();
let spanApplier = rangy.createClassApplier('span');
let divApplier = rangy.createClassApplier('div');

spanHighlighter.addClassApplier(spanApplier);
divHighlighter.addClassApplier(divHighlighter);

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



let doc = {
    typing: true,
    selection,
    $textArea: $('#textArea'),
    toggle: (className)=>{

    },
    makeItalic: ()=>{
        spanHighlighter.highlight('italic');
    },

    makeBold: ()=>{
        spanHighlighter.highlight('bold');
    },

    highlight: ()=>{
        spanHighlighter.highlight('highlight');
    },
    makeStrikethrough: ()=>{
        spanHighlighter.highlight('strikethrough');
    },
    addCheckBox: ()=>{
        rangey.createRange().insertNode('<input type="checkbox">');
    },
    addUrl: (url)=>{
        spanHighlighter.highlight('bold');
    }
}

/**doc.$textArea.on('mouseup', 'keyup', function(e) {
    if(typingMode){
        doc.selection  = rangey.
    }
});**/

doc.$textArea.on('input', ()=>{
    let currText = $textArea.value;
    let prevText = currText.slice(0, cursorPos);
    const cursorPos = $textArea.selectionStart;
    

    const patterns = [
        [/(^|[\r\n])(-|*)( |\t)$/, ()=>{
            doc.makeBullet(PLAIN);
        }],
        [/`(la)?tex$/, doc.makeTex],
        [/'img$/, doc.insertImg],
        [/(^|[\r\n])1(\)|.)$/, ()=>{
            doc.makeBullet(NUM);
        }],
        [/(^|[\r\n])i(\)|.)$/i, ()=>{
            doc.makeBullet(ROMAN);
        }],
        [/(^|[\r\n])a(\)|.)$/i, ()=>{
            doc.makeBullet(LETTER);
        }],
        [/'(b|(bold)|(strong))$/i, doc.makeBold],
        [/'(i|(em)|(italics?))$/i, doc.makeItalic],
        [/'(u(nderline)?)$/i, doc.underline],
        [/'c(ode)?$/i, doc.addCode],
        [/'table$/i, doc.addTable],
        [/'check(box)?$/, doc.addCheckBox],
        [/'h(ighlight)?$/, doc.addUrl],
        [/'url$/, doc.addUrl],
        [/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, (url)=>{
            doc.addUrl(url);
        }]
    ];
    for(pattern of patterns){
        const matches = prevText.exec(pattern[0]);
        if(matches){
            const match = matches[0];
            pattern[1](match);
            currText = currText.slice;
            $textArea.value = prevtext.slice(0, match.firstIndex) + currText.slice(cursorPos);
        }

    }
});

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