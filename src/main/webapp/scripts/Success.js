if(typeof window.Notify == "undefined") {
    window.Notify = function() {
        var active=0;

        this.show = function() {
            $('#successMessage').hide();
            $('#successMessage').fadeIn("slow");

            active++;

            setTimeout(function(){
                active--;

                if(active===0)
                    $('#successMessage').fadeOut('slow');
            }, 5000);
        }
    }
}