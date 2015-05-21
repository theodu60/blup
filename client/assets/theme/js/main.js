$(function() {
    // Iterate over each select element
    $('select').each(function () {

        // Cache the number of options
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        // Hides the select element
        $this.addClass('s-hidden');

        // Wrap the select element in a div
        $this.wrap('<div class="select"></div>');

        // Insert a styled div to sit over the top of the hidden select element
        $this.after('<div class="styledSelect"></div>');

        // Cache the styled div
        var $styledSelect = $this.next('div.styledSelect');

        // Show the first select option in the styled div
        $styledSelect.text($this.children('option').eq(0).text());

        // Insert an unordered list after the styled div and also cache the list
        var $list = $('<ul />', {
            'class': 'options'
        }).insertAfter($styledSelect);

        // Insert a list item into the unordered list for each select option
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        // Cache the list items
        var $listItems = $list.children('li');

        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $styledSelect.click(function (e) {
            e.stopPropagation();
            $('div.styledSelect.active').each(function () {
                $(this).removeClass('active').next('ul.options').hide('fast');
            });
            $(this).toggleClass('active').next('ul.options').toggle('fast');
        });

        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            if($this.val()!=$(this).attr('rel')){
                // Let's fire a real change
                $this.val($(this).attr('rel'));
                $this.change(); // needed when select is hidden
            }
            $list.hide('fast');
        });

        // Hides the unordered list when clicking outside of it
        $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.hide('fast');
        });
    });
    
    // Selection des comparatifs
    $('html').on('click',function() {
        $('.selection-comparatifs-title').removeClass('js-up');
        $('.selection-comparatifs-title').addClass('js-down'); 
        $('.selection-content').removeClass('open');
        $('.selection-content').addClass('close');
    });
    $('.selection-comparatifs-title').on('click',function(e) {
        e.stopPropagation();
        // Flèche
        if($(this).hasClass('js-down')) {
            $(this).removeClass('js-down');
            $(this).addClass('js-up');
        } else {
            $(this).removeClass('js-up');
            $(this).addClass('js-down');               
        }
        // Ouverture/Fermeture
        var contentElem = $('.selection-content');
        if($(contentElem).hasClass('open')) {
            $(contentElem).removeClass('open');
            $(contentElem).addClass('close');
        } else {
            $(contentElem).removeClass('close');
            $(contentElem).addClass('open');                                       
        }
    });
    
    // iCheck
    $('input').iCheck({
        checkboxClass: 'icheckbox_square',
        radioClass: 'iradio_square',
    });
});