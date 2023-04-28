<script type="text/javascript">
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,tr',
      }, 'google_translate_element');
      
      setTimeout(function() {
        // Set the default language to Spanish
        var selectElement = document.querySelector('#google_translate_element select');
        selectElement.value = 'tr';
        selectElement.dispatchEvent(new Event('change'));
      }, 1000);
    }
  </script>
