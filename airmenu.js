/**
 * AIR responsive Menu # 1.73
 * Door Ferry
 *
 * OPTIES (defaults)
 *   menuclass: ".hoofdmenu" (Vul hier de class van het menu in)
 *   menuclassresponsive: "responsivemenu" (Vul hier de class in van het responsive menu)
 *   menutrigger_class: ".menutrigger" (Vul hier de class in van de trigger die het menu laat insliden)
 *   menutrigger_icon: ".menutrigger" (Vul hier het icoon in voor de trigger)
 *   prepend_r: "body" (Hieraan wordt geprepend wanneer responsive)
 *   prepend_d: ".menu" (Hieraan wordt geprepend wanneer weer desktop)
 *   breekpunt: 768 (Vul het breekpunt in)
 *   tablet_breekpunt: 1024 (Vul het breekpunt in van de tablet. Dit zorgt voor extra uitzonderingen bovenop de desktop versie om de hover te verbeteren)
 *   snelheid : 400 (Snelheid van het openen)
 *   transition: "swing" (Transition)
 *   submenu_icon: icoon responsive submenu (responsivemenu-arrow-down2)
 *   animatie: true (Zet animatie aan of uit van desktop)
 *   menu_animatie: true (Zet animatie uit bij animeren van responsive menu)
 *   css: false (Als je zelf de functionaliteit van uitklappen voor submenu's wilt maken zet je deze op true)
 *   buiten_container_class: false (Toevoegen van een extra class zodat de hele website kan worden bewogen voor een sidemenu)
 *
 * CALLBACKS
 *   beforeSlideUp : null (Callback voordat het responsive menu dicht gaat) VOORBEELD : beforeSlideUp: function(){ alert("before-up"); }
 *   afterSlideUp : null (Callback nadat het responsive menu dicht is gegaan) VOORBEELD : afterSlideUp: function(){ alert("after-up"); }
 *   beforeSlideDown : null (Callback voordat het responsive menu open gaat) VOORBEELD : beforeSlideDown: function(){ alert("before-down"); }
 *   afterSlideDown : null (Callback nadat het responsive menu open is gegaan) VOORBEELD : afterSlideDown: function(){ alert("after-down"); }
 *
 */
(function ($) {
    $.fn.AIRmenu = function (options) {

        //Opties
        var settings = $.extend({
            menuclass: ".hoofdmenu",
            menuclassresponsive: ".responsivemenu hoofdmenu",
            menutrigger_class: ".menutrigger",
            menutrigger_icon: "responsivemenu-bars",
            prepend_r: ".responsivemenucontainer",
            prepend_d: ".menucontainer",
            breekpunt: 769,
            tablet_breekpunt: 1024,
            snelheid: 400,
            transition: "swing",
            submenu_icon: "responsivemenu-arrow-down2",
            animatie: true,
            menu_animatie: true,
            css: false,
            beforeSlideUp: null,
            afterSlideUp: null,
            beforeSlideDown: null,
            afterSlideDown: null
        }, options);

        //Settings omzetten in variabelen
        var menu_class = settings.menuclass;
        var responsive_menu = settings.menuclassresponsive.replace(".", "");
        var menutrigger_class = settings.menutrigger_class;
        var prepend_responsive = settings.prepend_r;
        var prepend_desktop = settings.prepend_d;
        var breekpunt = settings.breekpunt;
        var tablet_breekpunt = settings.tablet_breekpunt;
        var snelheid = settings.snelheid;
        var transition = settings.transition;
        var submenu_dicht = settings.submenu_icon;
        var gebroken_tablet = false;
        var gebroken = false;
        var gelijmd_tablet = false;
        var gelijmd = false;
        var animatie = settings.animatie;
        var menuanimatie = settings.menu_animatie;
        var beforeSlideUp = settings.beforeSlideUp;
        var afterSlideUp = settings.afterSlideUp;
        var beforeSlideDown = settings.beforeSlideDown;
        var afterSlideDown = settings.afterSlideDown;
        var complete = null;
        var css = settings.css;

        //Menu positioneren
        function airmenu()
        {
            var current_width = $(window).innerWidth();
            if (current_width <= breekpunt) {

                //Responsive
                var menuclass = menu_class.replace(".", "");
                $(menu_class).prependTo($(prepend_responsive)).addClass(responsive_menu).removeClass("clearfix");
                $("." + responsive_menu).removeClass(menuclass);
                if ($(".websitecontainer").length > 0) {
                    $(".websitecontainer").removeClass("responsivemenu_geopend");
                    $('.responsiveoverlay').fadeIn();
                }
            } else {

                //Desktop
                var menuclass = menu_class.replace(".", "");
                $("." + responsive_menu).addClass(menuclass).addClass("clearfix").removeClass(responsive_menu);
                $(menu_class).prependTo($(prepend_desktop));
                if ($(".websitecontainer").length > 0) {
                    $(".websitecontainer").removeClass("responsivemenu_geopend");
                    $('.responsiveoverlay').fadeIn();
                }
            }
        }

        //Trigger functionaliteit
        function menutrigger()
        {
            $(menutrigger_class).click(function () {
                if (menuanimatie === true) {
                    $(menu_class).toggleClass("responsiveuitgeklapt");
                    if ($(menu_class).hasClass("responsiveuitgeklapt")) {
                        complete = afterSlideDown;
                        $.isFunction(beforeSlideDown) && beforeSlideDown.call(this);
                    } else {
                        complete = afterSlideUp;
                        $.isFunction(beforeSlideUp) && beforeSlideUp.call(this);
                    }
                    $(menu_class).slideToggle(snelheid, transition, complete);
                    if ($(".websitecontainer").length > 0) {
                        $(".websitecontainer").toggleClass("responsivemenu_geopend");
                    }
                } else {
                    $(menu_class).toggle();
                    if ($(".websitecontainer").length > 0) {
                        $(".websitecontainer").toggleClass("responsivemenu_geopend");
                    }
                }

                // Scrollen naar de header
                $('html, body').animate({scrollTop: 0}, 400);
            });
        }

        // Pijlen aanmaken (voor responsive variant)
        function append_arrows()
        {

            $(menu_class + ' li').each(function () {
                if ($(this).has('ul').length == 1) {
                    $(this).append('<span class="submenuarrow ' + submenu_dicht + '"></span>');
                }
            });

        }

        // Menu opbouwen
        var RenderMenu = function ()
        {
            var current_width = $(window).innerWidth();

            //unbinden van disable link functie
            function disableLink(element) {
                $(element).find('a').eq(0).on('click.disablelink', function (e) {
                    e.preventDefault();
                });
            }
            function activateLink(element) {
                $(element).find('a').eq(0).off('click.disablelink');
            }
            function bindClick(element) {

                //Click mogelijkheid uitschakelen op huidig item
                $(element).one('click.airmenu', function () {
                    activateLink(element);
                    $(menu_class + ' li').each(function () {

                        //Deactiveer de click mogelijkheid op het huidige item.
                        if ($(this).data("bound") === "linked") {
                            bindClick(this);
                            $(this).data("bound", "broken");
                            $(this).unbind('click.airmenu');
                            activateLink(this);
                        }

                        //Reset eerder aangeklikte menu items (zodat deze nogmaals kunnen worden geopend)
                        if ($(this).data("bound") === "broken") {
                            disableLink(this);
                            bindClick(this);
                            $(this).data("bound", "empty");
                        }
                    });

                    //Reset van huidige submenu's
                    var clickedElement = $(this);
                    if (clickedElement.parent('ul').length) {

                        // Zorgen dat de inner subitems inklappen wanneer er een ander innersubitem wordt aangeklikt
                        clickedElement.parent('ul').find('ul').each(function () {
                            $(this).slideUp("fast").removeClass("opacitytransition");
                            $(this).css("height", "auto");
                        });
                        var ouder = $(this).parent('ul');
                        var grootouder = $(this).parents('li');
                        if (!ouder.hasClass(menu_class.replace(".", ""))) {
                            if (clickedElement.children('ul').length) {

                                //Submenu animeren
                                clickedElement.children('ul').stop(true).slideToggle("fast").toggleClass("opacitytransition");
                                $(clickedElement).data("bound", "linked");
                                grootouder.unbind('click.airmenu');
                                grootouder.data("bound", "linked");
                                activateLink(this);
                            }
                            return false;
                        } else {

                            //Hoofdkop animeren (slideUP / slideDown)
                            $(menu_class + ' ul').slideUp("fast").removeClass("opacitytransition");
                            $(element).find('ul').eq(0).stop(true).slideToggle("fast").toggleClass("opacitytransition");
                            $(element).data("bound", "linked");
                        }
                    }
                });
            }

            if (current_width <= breekpunt && !gebroken) {

                // Als een scherm kleiner is, Click gebruiken
                $(menutrigger_class).show();
                $(menu_class).hide(); // Verberg menu standaard
                $(menu_class + " ul").css("height", "auto").hide();
                $(menu_class + ' li').each(function () {
                    //unbinden van hover functie
                    $(this).off('mouseenter.airmenu');
                    $(this).off('mouseleave.airmenu');
                    if ($(this).has('ul').length == 1) {
                        disableLink(this);
                        bindClick(this);

                        // Checken of er een item met submenus actief is en deze laten zien
                        if ($(this).hasClass("actief")) {
                            $(this).find('ul').eq(0).show().toggleClass("opacitytransition");
                            $(this).unbind('click.airmenu');
                            $(this).data("bound", "linked");
                            activateLink(this);
                        }
                    }
                });
                gebroken = true;
                gelijmd = false;

            } else if (current_width > breekpunt && !gelijmd) {

                // Als het scherm groot genoeg is, dan Hover gebruiken
                $(menu_class).show(); // Show menu standaard
                $(menutrigger_class).hide();
                if (css === true) {
                    //submenu's functionaliteit zelf maken
                } else {
                    $(menu_class + ' li ul').hide().removeClass("opacitytransition");
                }
                $(menu_class + ' li').each(function () {

                    //unbinden van clickfunctie
                    $(this).off('click.airmenu');
                    $(this).off('click.disablelink');
                    $(this).on('mouseenter.airmenu', function () {
                        if ($(this).children('ul').length) {
                            var submenuhover = $(this).find('ul').eq(0);
                            $(this).find('ul').css('height', 'auto');
                            if (css === true) {
                                // Gebruik geen js maar eigen script
                            } else {
                                if (animatie === true) {
                                    submenuhover.stop(true).slideDown("fast").addClass("opacitytransition");
                                } else {
                                    submenuhover.stop(true).show().addClass("opacitytransition");
                                }
                            }
                        }
                    });
                    $(this).on('mouseleave.airmenu', function () {
                        if (css === true) {

                            // Geen js functie uitvoeren
                        } else {
                            $(this).find('ul').stop(true).hide().removeClass("opacitytransition");
                        }
                    });
                });
                gebroken = false;
                gelijmd = true;
            }

            //Tablet uitzonderingen toevoegen aan desktop
            var tablet_render = function (element, current_width) {
                if (current_width <= tablet_breekpunt && current_width > breekpunt && !gebroken_tablet) {
                    //Tablet resolutie uitzonderingen
                    $(menu_class + ' li').each(function () {
                        if ($(this).has('ul').length == 1) {
                            $(this).find('a').eq(0).addClass("tablethover");
                            $(this).off('mouseenter.airmenu');
                            $(this).off('mouseleave.airmenu');
                            disableLink(this);
                            bindClick(this);
                        }
                    });
                    gebroken_tablet = true;
                    gelijmd_tablet = false;
                } else if (current_width > tablet_breekpunt && current_width < breekpunt && !gelijmd_tablet) {

                    //Groter dan tablet resolutie
                    $(menu_class + ' li').each(function () {

                        //unbinden van clickfunctie
                        $(this).off('click.airmenu');
                        $(this).off('click.disablelink');
                        $(this).on('mouseenter.airmenu', function () {
                            if ($(this).children('ul').length) {
                                var submenuhover = $(this).find('ul').eq(0);
                                $(this).find('ul').css('height', 'auto');
                                if (css === true) {
                                    // Gebruik geen js maar eigen script
                                } else {
                                    if (animatie === true) {
                                        submenuhover.stop(true).slideDown("fast").addClass("opacitytransition");
                                    } else {
                                        submenuhover.stop(true).show().addClass("opacitytransition");
                                    }
                                }
                            }
                        });
                        $(this).on('mouseleave.airmenu', function () {
                            if (css === true) {
                                // Geen js functie uitvoeren
                            } else {
                                $(this).find('ul').stop(true).hide().removeClass("opacitytransition");
                            }
                        });
                    });
                    gebroken_tablet = false;
                    gelijmd_tablet = true;
                } else if (current_width < tablet_breekpunt && current_width < breekpunt && !gelijmd_tablet) {

                    //Kleiner dan tablet resolutie en kleiner dan breekpunt
                    gebroken_tablet = false;
                    gelijmd_tablet = true;
                }
            }

            msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
                    touchSupport = (("ontouchstart" in window) || msGesture || window.DocumentTouch && document instanceof DocumentTouch);
            if (touchSupport) {

                //Touch device (smartphone / tablet)
                tablet_render(this, current_width);

            } else {

                //Geen touch device
                if (current_width > breekpunt) {
                    $(menu_class + ' li').each(function () {
                        activateLink(this);
                    });
                }

            }
        };

        // Alles uitvoeren
        $(prepend_responsive).prepend('<!-- AIRmenu -->');
        $(prepend_desktop).prepend('<!-- AIRmenu -->');
        append_arrows();
        airmenu();
        menutrigger();
        RenderMenu();
        // Bij resize, alles herberekenen
        $(window).resize(function () {
            RenderMenu();
            airmenu();
        });
    };
}(jQuery));
