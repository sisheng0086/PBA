$(function () {
  // 🎭 Cast grid
  const cast = [
    { name: 'Cillian Murphy', img: 'image/pic2.png', wiki: 'https://en.wikipedia.org/wiki/Cillian_Murphy' },
    { name: 'Emily Blunt', img: 'image/pic4.png', wiki: 'https://en.wikipedia.org/wiki/Emily_Blunt' },
    { name: 'Matt Damon', img: 'image/pic5.png', wiki: 'https://en.wikipedia.org/wiki/Matt_Damon' },
    { name: 'Robert Downey Jr.', img: 'image/pic3.png', wiki: 'https://en.wikipedia.org/wiki/Robert_Downey_Jr.' }
  ];


  // Build cast grid
  const $grid = $('#castGrid');
  cast.forEach(c => {
    $grid.append(`
      <div class="col-6 col-md-3 text-center">
        <img src="${c.img}" alt="${c.name}" class="img-fluid rounded mb-2">
        <div><a href="${c.wiki}" target="_blank" class="link-danger">${c.name}</a></div>
      </div>
    `);
  });

  // Video controls
  const $video = $('#heroVideo');
  $('#playBtn').click(() => {
    if ($video.length && $video[0].play) $video[0].play().catch(()=>{});
    $video[0] && $video[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  $('#pauseBtn').click(() => { $video[0] && $video[0].pause(); });
  $('#vol').on('input', function () {
    if ($video[0]) $video[0].volume = parseFloat(this.value);
  });

  // Contact modal instance
  const contactModalEl = document.getElementById('contactModal');
  const contactModal = new bootstrap.Modal(contactModalEl, { backdrop: 'static', keyboard: true });

  // Open contact modal
  $('#openContact').click(() => contactModal.show());

  // Submit handler: keep modal open after success, show message, disable submit to prevent doubles
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();

    // clear previous messages
    $('#cNameError').text('');
    $('#cEmailError').text('');
    $('#cMessageError').text('');
    $('#cConsentError').text('');
    $('#cSuccess').text('').removeClass('text-success');

    const name = $('#cName').val().trim();
    const email = $('#cEmail').val().trim();
    const message = $('#cMessage').val().trim();
    const consent = $('#cConsent').is(':checked');

    let valid = true;
    if (!name) { $('#cNameError').text('Please enter your name.'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { $('#cEmailError').text('Enter a valid email.'); valid = false; }
    if (!message) { $('#cMessageError').text('Please enter a message.'); valid = false; }
    if (!consent) { $('#cConsentError').text('Consent is required.'); valid = false; }
    if (!valid) return;

    // Demo submission object
    const submission = { name, email, message, consentGiven: true, consentTimestamp: new Date().toISOString() };
    console.log('Contact submission:', submission);

    // Disable submit button and show success text; do NOT auto-close
    const $submitBtn = $(this).find('button[type="submit"]');
    $submitBtn.prop('disabled', true).text('Sent');

    $('#cSuccess').addClass('text-success').text('Thank you — your message has been recorded.');

    // Ensure success visible
    $('#cSuccess')[0] && $('#cSuccess')[0].scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Reset when modal actually hides (user closes it)
    $(contactModalEl).off('hidden.bs.modal.resetForm').on('hidden.bs.modal.resetForm', function () {
      $('#contactForm')[0].reset();
      $('#cNameError').text('');
      $('#cEmailError').text('');
      $('#cMessageError').text('');
      $('#cConsentError').text('');
      $('#cSuccess').text('').removeClass('text-success');
      $submitBtn.prop('disabled', false).text('Send Message');
      $('#cName').focus();
    });
  });

  // Fallback for broken images
  $('img').on('error', function () {
    if (!$(this).data('fallback')) {
      $(this).data('fallback', true).attr('src', 'image/fallback.jpg');
    }
  });

  // Interstellar details demo
  $('#interDetails').click(() => {
    location.href ='https://www.netflix.com/title/70305903';
  });

  // Sticky header class on scroll
  const $header = $('#siteHeader');
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) $header.addClass('scrolled'); else $header.removeClass('scrolled');
  });
});