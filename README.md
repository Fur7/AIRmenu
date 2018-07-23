

# AIR responsive Menu # 1.73


### OPTIES (defaults)

    //Vul hier de class van het menu in
    menuclass: ".hoofdmenu"
    
    //Vul hier de class in van het responsive menu
    menuclassresponsive: "responsivemenu"

    //Vul hier de class in van de trigger die het menu laat insliden
    menutrigger_class: ".menutrigger"
    
    //Vul hier het icoon in voor de trigger
    menutrigger_icon: ".menutrigger" 
    
    //Hieraan wordt geprepend wanneer responsive
    prepend_r: "body"
    
    //Hieraan wordt geprepend wanneer weer desktop
    prepend_d: ".menu"
    
    Vul het breekpunt in
    breekpunt: 768
    
    //Vul het breekpunt in van de tablet. Dit zorgt voor extra uitzonderingen bovenop de desktop versie om de hover te verbeteren
    tablet_breekpunt: 1024 
    
    //Snelheid van het openen
    snelheid : 400
    
    //Transition
    transition: "swing"
    
    //responsivemenu-arrow-down2
    submenu_icon: icoon responsive submenu
    
    //Zet animatie aan of uit van desktop
    animatie: true
    
    //Zet animatie uit bij animeren van responsive menu
    menu_animatie: true
    
    //Als je zelf de functionaliteit van uitklappen voor submenu's wilt maken zet je deze op true
    css: false
    
    //Toevoegen van een extra class zodat de hele website kan worden bewogen voor een sidemenu
    buiten_container_class: false


CALLBACKS

**beforeSlideUp** : null (Callback voordat het responsive menu dicht gaat) 
VOORBEELD : 

    beforeSlideUp: function(){ alert("before-up"); }

**afterSlideUp** : null (Callback nadat het responsive menu dicht is gegaan) 
VOORBEELD : 

    afterSlideUp: function(){ alert("after-up"); }

**beforeSlideDown** : null (Callback voordat het responsive menu open gaat) 
VOORBEELD : 

    beforeSlideDown: function(){ alert("before-down"); }

**afterSlideDown** : null (Callback nadat het responsive menu open is gegaan) 
VOORBEELD :

    afterSlideDown: function(){ alert("after-down"); }
