function goTo(page) {
	$('.frame').fadeOut();
	$('#'+page).fadeIn();
	$('#'+page).css('display','flex');
}