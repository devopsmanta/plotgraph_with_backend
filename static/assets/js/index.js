var datasets = []
const SuperfishelStone10 = ['#6388b4', '#ffae34', '#ef6f6a', '#8cc2ca', '#55ad89', '#c3bc3f', '#bb7693', '#baa094', '#a9b5ae', '#767676']

$(window).on('load', function () {
    $('.sidenav').sidenav();
    generateMultiGraph = () => {
	var xlow = document.getElementById("xlow").value;
        var xhigh = document.getElementById("xhigh").value;
        var newtext = document.getElementById("math").value;
        var mathML = org.mathdox.formulaeditor.FormulaEditor.getEditorByTextArea("math").getMathML();
        const wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'formula_wrapper')
        const colorNode = document.createElement('div')
        colorNode.setAttribute('style', 'background: ' + SuperfishelStone10[datasets.length % 10])
        colorNode.setAttribute('class', 'formula_color')
        const mathMLNode = document.createElement('span')
        mathMLNode.innerHTML = '(' + mathML + ')\''
        wrapper.appendChild(colorNode)
        wrapper.appendChild(mathMLNode)
        document.getElementById("formula_list").appendChild(wrapper)
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, mathMLNode]);
        sample_datapoints = []
        $.ajax({
            url: "http://localhost:3000/postDerive",
            contentType: "application/json",
            dataType: "json",
            type: "POST",
            'data': JSON.stringify(newtext+"xlow"+xlow+"xhigh"+xhigh),
            success: function (data) {
                datasets.push({
                    label: 'f`(x)',
                    fill: false,
                    borderWidth: 1,
                    data: data,
                    radius: 0,
                })
                runchartjs(datasets)
                $('#graph_shell').slideDown();
                window.scrollTo({
                    top: 400,
                    behavior: 'smooth',
                });
            }
        });
    }
    generateGraph = () => {
        var xlow = document.getElementById("xlow").value;
        var xhigh = document.getElementById("xhigh").value;
        var newtext = document.getElementById("math").value;
        var mathML = org.mathdox.formulaeditor.FormulaEditor.getEditorByTextArea("math").getMathML();
        const wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'formula_wrapper')
        const colorNode = document.createElement('div')
        colorNode.setAttribute('style', 'background: ' + SuperfishelStone10[datasets.length % 10])
        colorNode.setAttribute('class', 'formula_color')
        const mathMLNode = document.createElement('span')
        mathMLNode.innerHTML = mathML
        wrapper.appendChild(colorNode)
        wrapper.appendChild(mathMLNode)
        document.getElementById("formula_list").appendChild(wrapper)
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, mathMLNode]);
        sample_datapoints = []
        $.ajax({
            url: "http://localhost:3000/postXML",
            contentType: "application/json",
            dataType: "json",
            type: "POST",
            'data': JSON.stringify(newtext+"xlow"+xlow+"xhigh"+xhigh),
            success: function (data) {
                console.log('before', datasets)
                datasets.push({
                    label: 'f(x)',
                    fill: false,
                    borderWidth: 1,
                    data: data,
                    pointRadius: 0,
                })
                console.log(datasets)
                runchartjs(datasets)
                $('#graph_shell').slideDown();
                window.scrollTo({
                    top: 400,
                    behavior: 'smooth',
                });
            }
        });
    }
    generate3Dgraph = () => {
        var newtext = document.getElementById("math").value;
        document.getElementById('graph_3Dshell').innerHTML = '<img src="static/3Dgraph.png">';
        $('#graph_3Dshell').slideDown();
        window.scrollTo({
            top: 400,
            behavior: 'smooth',
        });
    }
    function downloadPDF() {
        var canvas = document.querySelector('#newGraph');
        var canvasImg = canvas.toDataURL("image/png", 1.0);
        var doc = new jsPDF('landscape');
        doc.setFontSize(20);
        doc.text(15, 15, "Cool Chart");
        doc.addImage(canvasImg, 'JPEG', 10, 10, 280, 150);
        doc.save('canvas.pdf');
    }
    document.getElementById('download_2Dgraph').addEventListener("click", downloadPDF);
    runchartjs = (data) => {
        new Chart(document.getElementById("newGraph"), {
            type: 'scatter',
            showline: true,
            data: {
                datasets: datasets,
                pointRadius: 0
            },
            options: {
                responsive: true,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            //stepSize: 1,
                            display: true,
                            autoSkip: true,
                            maxTicksLimit: 20
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'X-Axis'
                        }
                    }
                    ],
                    yAxes: [{
                        ticks: {
                            //stepSize: 1,
                            display: true,
			    autoSkip: true,
                            maxTicksLimit: 20
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Y-Axis'
                        }
                    }]
                },
                plugins: {
                    colorschemes: {
                        scheme: 'tableau.SuperfishelStone10',
                    }
                }
            }
        });
    }
    clearChatjs = () => {
        datasets.splice(0, datasets.length)
        const formulaListNode = document.getElementById('formula_list')
        while (formulaListNode.hasChildNodes()) {
            formulaListNode.removeChild(formulaListNode.firstChild)
        }
        runchartjs(datasets)
    }
    document.getElementById('clear_2Dgraph').addEventListener("click", clearChatjs);
});
