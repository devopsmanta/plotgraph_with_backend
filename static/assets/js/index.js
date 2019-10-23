var datasets
$(window).on('load', function () {
    $('.sidenav').sidenav();
    generateMultiGraph = () => {
	var xlow = document.getElementById("xlow").value;
        var xhigh = document.getElementById("xhigh").value;
        var newtext = document.getElementById("math").value;
        document.getElementById("output").value = newtext;
        myxml = newtext
        sample_datapoints = []
        $.ajax({
            url: "http://localhost:3000/postDerive",
            contentType: "application/json",
            dataType: "json",
            type: "POST",
            'data': JSON.stringify(newtext+"xlow"+xlow+"xhigh"+xhigh),
            success: function (data) {
                datasets = [{
                    label: 'f`(x)',
                    fill: false,
                    backgroundColor: 'rgb(213, 110, 255)',
                    borderColor: 'rgb(133, 39, 171)',
                    borderWidth: 1,
                    data: data,
                    radius: 0,
                }]
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
        document.getElementById("output").value = newtext;
        myxml = newtext
        sample_datapoints = []
        $.ajax({
            url: "http://localhost:3000/postXML",
            contentType: "application/json",
            dataType: "json",
            type: "POST",
            'data': JSON.stringify(newtext+"xlow"+xlow+"xhigh"+xhigh),
            success: function (data) {
                datasets = [{
                    label: 'f(x)',
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    data: data,
                    pointRadius: 0,
                }]
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
        document.getElementById("output").value = newtext;
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
                }
            }
        });
    }
});
