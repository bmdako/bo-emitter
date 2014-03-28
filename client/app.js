
function ArtikelViewModel() {
    var self = this;
    self.artikler = ko.observableArray([]);

    self.hent = function() {
        $.getJSON("/data.json", function(data) {
            $.each(data, function(index, elem) {
                console.log(elem);
                self.artikler.push(elem);
            });
        });   
    }
    self.hent();
}

ko.applyBindings(new ArtikelViewModel(), document.getElementById('artiklerWrapper'));


function BreakingViewModel() {
    var self = this;

    self.showBreaking = ko.observable(false);
    self.breakingText = ko.observable();
    self.breakingType = ko.observable();

    self.socket = io.connect('http://localhost:8001');
    self.socket.on('breaking', function(data) {
        console.log(data);
        self.breakingText(data.text);
        self.breakingType(data.type);
        self.showBreaking(true);

        // setTimeout(function() {
        //     self.showBreaking(false);
        // }, 1000);
    });
}

ko.applyBindings(new BreakingViewModel(), document.getElementById('breakingWrapper'));
