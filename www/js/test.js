<script src="fileadmin/templates/nutricia/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="fileadmin/templates/nutricia/js/jquery.snap-puzzle.js"></script>
    <link rel="stylesheet" href="fileadmin/templates/nutricia/formhandler/enfit/pure-min.css">
    <link rel="stylesheet" href="fileadmin/templates/nutricia/formhandler/enfit/grids-responsive-min.css">
    <script type="text/javascript">


    $(document).ready(function(){
        (function() {
            var $;

            $ = jQuery;

            $.fn.test = function(options) {
                var currentStep = 0;
                var currentQuestionObj ;

                var questions = $.extend({}, options);

                startSlider = function(){
                    $(currentQuestionObj).find('.ui-slider').slider({
                        value:questions[currentStep]['default'],
                        min: 50,
                        max: 550,
                        step: 100,
                        slide: function( event, ui ) {
                            $(currentQuestionObj).find( ".amount" ).val(  questions[currentStep]['option'][ui.value] );
                            $(currentQuestionObj).find('.answer li').removeClass('active');
                            actObj = $(currentQuestionObj).find('.answer li').get((ui.value/50 +1)/2 -1);
                            $(actObj).addClass('active');
                        }
                    });
                }

                startPuzzle = function(){
                    $(currentQuestionObj).find('.pile').height($(currentQuestionObj).find('.source_image').height());
                    $(currentQuestionObj).find('.puzzle_solved').hide();
                    $(currentQuestionObj).find('input[type="button"]').css('display', 'none');

                    $(currentQuestionObj).find('.source_image').snapPuzzle({
                        rows: questions[currentStep]['rows'], columns: questions[currentStep]['columns'],
                        pile: '#step-'+currentStep +' .pile',
                        containment: '#step-'+currentStep +' .puzzle-containment',
                        onComplete: function(){
                            $(currentQuestionObj).find('.source_image').fadeOut(150).fadeIn();
                            $(currentQuestionObj).find('.puzzle_solved').show();
                            $(currentQuestionObj).find('.puzzle').val(1);
                            $(currentQuestionObj).find('input[type="submit"]').css('display','block');
                            $(currentQuestionObj).find('input[type="button"]').css('display','none');
                        }
                    });

                    $(window).resize(function(){
                        $(currentQuestionObj).find('.pile').height($(currentQuestionObj).find('.source_image').height());
                        $(currentQuestionObj).find('.source_image').snapPuzzle('refresh');
                    });
                }

                validateScroll  = function(answer){
                    liObj = $(currentQuestionObj).find('ul li').get(answer);
                    $(liObj).addClass('correct');
                }

                validateCheckbox = function(answer){
                    var answers = answer.split('+');

                    $(currentQuestionObj).find('input[type="checkbox"]').each(function(){
                        if(this.checked && ($.inArray($(this).val(), answers ) == -1)){
                            $(this).parent().addClass('incorrect');
                            this.checked = false;
                        }

                        if($.inArray($(this).val(), answers ) != -1){
                            $(this).parent().addClass('correct');
                            this.checked = true;
                        }

                    });
                }

                validateQuestion = function(){
                    $(currentQuestionObj).find(".validate").css('display', 'none');
                    $(currentQuestionObj).find(".nextStep").css('display', 'block');
                    switch(questions[currentStep]['type']){
                        case 'checkbox' : validateCheckbox(questions[currentStep]['answer']);break;
                        case 'scroll' : validateScroll(questions[currentStep]['answer']);break;
                        default : return;
                    }

                }

                hiderCurrentShowNext = function() {

                    $("#step-"+(currentStep)).css('display', 'none');
                    $("#step-"+(currentStep+1)).css('display', 'block');

                    currentStep++;
                    currentQuestionObj = $("#step-"+(currentStep));
                    applyClickEvent(currentQuestionObj);
                    // initialize the next step, need jquery ui library
                    if(questions[currentStep]['type'] == 'scroll'){
                        startSlider();
                    }
                    // initialize the next step, need jquery snap puzzle library
                    if(questions[currentStep]['type'] == 'puzzle'){
                        startPuzzle();
                    }
                };
                applyClickEvent = function(currentQuestionObj){
                    $(currentQuestionObj).find(".validate").on('click', validateQuestion);
                    $(currentQuestionObj).find(".nextStep").on('click', hiderCurrentShowNext);

                }

                process = function() {

                    $("#step-0").css('display', 'block');
                    currentQuestionObj = $("#step-"+(currentStep));
                    applyClickEvent(currentQuestionObj);

                };
                initialize = function() {
                    process();
                };
                return initialize();
            };

        }).call(this);


        var question0 = '';
        var question1 = {type:"checkbox", answer:"Weltweit+In Europa"};
        var question2 = {type:"scroll", answer:"1", option :{"50":"Q3 2015", "150":"Q4 2015", "250":"Q1 2016", "350":"Q2 2016", "450":"Q3 2016", "550":"Q4 2016"}, default: "300"};
        var question3 = {type:"puzzle", rows: 3, columns : 2}
        var question4 = {type:"checkbox", answer:"Adapter am Dreiwegehahn zur Konnektierung von Luer-, Oralen und ENLock Spritzen/Dispensern+ENLock Adapter am Patientenenden zur Verbindung mit der ENLock Sonde"};
        var question5 = {type:"scroll", answer:"2", option :{"50":"Q1 2015", "150":"Q2 2015", "250":"Q3 2015", "350":"Q4 2015", "450":"Q1 2016", "550":"Q2 2016"}, default: "100"};
        var question6 = {type:"puzzle", rows: 2, columns : 2}
        var options = {0:question0, 1:question1, 2:question2, 3:question3, 4:question4, 5:question5, 6:question6};
        $(".enfit").test(options);

        $('input[type="checkbox"]').click(function(){

            if($(this).is(':checked')){
                $(this).parent().addClass('checked');
            }else{
                $(this).parent().removeClass('checked');
            }

        });

    });

</script>

