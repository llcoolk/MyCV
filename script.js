
$(function() {

    // Smooth Scrolling: Smooth scrolls to an ID on the current page.
    // To use this feature, add a link on your page that links to an ID, and add the .page-scroll class to the link itself. See the docs for more details.
    $('.nav-link').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 140)
        }, 800, 'easeInOutExpo');
        event.preventDefault();
    });

    $('.navbar-toggler').on('click', function() {
        $(this).toggleClass('active');
    })


    function socialIcon(network) {
        switch(network) {
            case 'facebook':
                return '<i class="fab fa-facebook-f"></i>';
            case 'instagram':
                return '<i class="fab fa-instagram"></i>';
            case 'linkedin':
                return '<i class="fab fa-linkedin"></i>';
            case 'github':
                return '<i class="fab fa-github"></i>';
            default:
                return '<i class="fas fa-envelope"></i>'
        }
    }

    $.getJSON('./resume.json', function( result) {
   
        // Summary
        $("#basic-name").html(result.basics.name);
        $("#basic-label").html(result.basics.label);
        $("#basic-summary").html(result.basics.summary);
       
        // Tables
        $("#basics-name").html(result.basics.name);
        $("#basic-email").html(result.basics.email);
        $("#basic-phone").html(result.basics.phone);
        $("#basic-address").html(result.basics.location.address);
        $("#basic-city").html(result.basics.location.city);
        $("#basic-zip").html(result.basics.location.postalCode);
        
        // Social Icons
        var profilesOutput = '';
        $.each(result.basics.profiles, function( i, profile) {
            profilesOutput += `<li><a href="${ profile.url }">${socialIcon(profile.network)}</a></li>`

        });

        $("#profiles").html(profilesOutput);

        // Open new tab when social icon is clicked
        // $("#profiles").on("click", function() {
        //     windows.open("${ profile.url }","_blank");
            
        // });

        // Languages()
        var langOutput = '';
        $.each(result.languages, function( i, lang) {

            langOutput += `<img src="http://www.countryflags.io/${lang.code}/shiny/32.png">`
        });

        $("#languages").html(langOutput);


        // Skills
        var skillsOutput = '';
        $.each( result.skills, function( i, skill) {
            
            var list = '';
            $.each(skill.list, function(i, keyword) { 
                list += `

                <div class="keyword">
                <p>${keyword.name}</p>
                </div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${keyword.level}%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                `
            });

            skillsOutput += `
            <div class="mb-5">
            <h4 class="label">${skill.name}</h4>
            ${list}
            </div>
            `;
        });

        $("#skills").html(skillsOutput);

        // Education
        var eduOutput = '<ul>';
        $.each( result.education, function( i, edu) {
            
            eduOutput += `
            <li class="mb-5">
                <h4 class="label">${edu.institution}</h4>
                <time>${edu.startDate} - ${edu.endDate}</time>
                <p>${edu.courses.join(", ")} </p>
            </li>
            `;
        });
        
        eduOutput += '</ul>';
        $("#education").html(eduOutput);

        // Work Experience
        var expOutput = '<ul>';
        $.each( result.work, function( i, exp) {
            
            expOutput += `
            <li class="mb-5">
                <h4 class="label">${exp.company}</h4>
                <time>${exp.startDate} - ${exp.endDate}</time>
                <h6>${exp.position}</h6>
                <p>${exp.highlights}</p>
            </li>
            `;
        });
        
        expOutput += '</ul>';
        $("#experience").html(expOutput);

        //Volunteering
        var volOutput = '<ul>';
        $.each( result.volunteer, function( i, vol) {
            
            volOutput += `
            <li class="mb-5">
                <h4 class="label">${vol.organization}</h4>
                <time>${vol.startDate} - ${vol.endDate}</time>  
                <h6 class="label">${vol.position}</h6>
                <p>${vol.summary}</p>
                
            </li>
            `;
        });
        
        volOutput += '</ul>';
        $("#volunteer").html(volOutput);

        // Reference
        var refOutput = '<ul>';
        $.each( result.references, function( i, ref) {
            
            refOutput += `
            <li class="mb-5">
                <h4 class="label">${ref.name}</h4>
                <p>${ref.reference}</p>
            </li>
            `;
        });

        refOutput += '</ul>';
        $("#reference").html(refOutput);


        // Reference - using cards

        // var refOutput = '<ul>';
        // $.each( result.references, function( i, ref) {
            
        //     refOutput += `
        //     <div class="col-md-6">
        //     <div class="card mb-4">
        //         <div class="card-body">
        //             <h5 class="card-title">${ref.name}</h5>
        //             <p class="card-text">${ ref.reference}</p>
        //         </div>
        //     </div>
        // </div>
        //     `;
        // });

        // $("#reference").html(refOutput);

    });

    // Github Repos    
    $.getJSON('https://api.github.com/users/llcoolk/repos', function(repos) {
        var reposOutput = '';
        $.each(repos, function(i, repo) {

            reposOutput += `
            <div class="col-md-6">
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="card-title-right">${repo.name}</h5>
                        <p class="card-text-right">${ repo.description ? repo.description : ''}</p>
                        <a href="${repo.html_url}" class="btn btn-primary" target="_blank">See repo</a>
                    </div>
                </div>
            </div>
            `;
        });

        $("#repos").html(reposOutput);
    });

})