---
layout: default
title: Nature's Window
permalink: /nature/
icon: 🌳
description: "Touch grass - nature imagery and filters."
---

<a href="/" class="glass-button" style="position: fixed; top: 20px; left: 20px; z-index: 1005;">← Back to Home</a>

<div id="filter-container" class="glass-panel" style="position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 1002; display: flex; flex-direction: column; gap: 12px; padding: 12px 20px; max-width: 90vw; align-items: center;">
    
    <div class="filter-group">
        <strong class="filter-label">Group:</strong>
        <button class="glass-button active" data-filter-type="group" data-filter="all">All</button>
        <button class="glass-button" data-filter-type="group" data-filter="plant">Plant</button>
        <button class="glass-button" data-filter-type="group" data-filter="forest">Forest</button>
        <button class="glass-button" data-filter-type="group" data-filter="flowingWater">Water</button>
        <button class="glass-button" data-filter-type="group" data-filter="ocean">Ocean</button>
        <button class="glass-button" data-filter-type="group" data-filter="mountains">Mountains</button>
        <button class="glass-button" data-filter-type="group" data-filter="clouds">Clouds</button>
        <button class="glass-button" data-filter-type="group" data-filter="tech">Tech</button>
        <button class="glass-button" data-filter-type="group" data-filter="anime">Anime</button>
    </div>

    <div class="filter-group">
        <strong class="filter-label">Vibe:</strong>
        <button class="glass-button active" data-filter-type="vibe" data-filter="all">All</button>
        <button class="glass-button" data-filter-type="vibe" data-filter="happy">Happy</button>
        <button class="glass-button" data-filter-type="vibe" data-filter="neutral">Neutral</button>
        <button class="glass-button" data-filter-type="vibe" data-filter="gloomy">Gloomy</button>
    </div>

    <div class="filter-group">
        <strong class="filter-label">Weather:</strong>
        <button class="glass-button active" data-filter-type="weather" data-filter="all">All</button>
        <button class="glass-button" data-filter-type="weather" data-filter="clear">Clear</button>
        <button class="glass-button" data-filter-type="weather" data-filter="rainy">Rainy</button>
        <button class="glass-button" data-filter-type="weather" data-filter="mist">Mist</button>
    </div>

    <div class="filter-group">
        <strong class="filter-label">Time:</strong>
        <button class="glass-button active" data-filter-type="time" data-filter="all">All</button>
        <button class="glass-button" data-filter-type="time" data-filter="dawn">Dawn</button>
        <button class="glass-button" data-filter-type="time" data-filter="noon">Noon</button>
        <button class="glass-button" data-filter-type="time" data-filter="dusk">Dusk</button>
        <button class="glass-button" data-filter-type="time" data-filter="sunrise">Sunrise</button>
        <button class="glass-button" data-filter-type="time" data-filter="sunset">Sunset</button>
    </div>
</div>

<div id="imageContainer" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; background-size: cover; background-position: center; background-repeat: no-repeat; transition: background-image 1s ease-in-out;"></div>

<div id="imageCredits" class="glass-card" style="position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 1003; min-width: 220px; text-align: center; opacity: 0.92; font-size: 1rem; pointer-events: none; display: none;"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {

// HIIIIIIIIIIIIIIIIII IT'S EOSYN! I ACTUALLY STARTED WRITING THINGS HERE!

// * - * - * - * - * - * - * - * - *

    // PASTE YOUR IMAGE LINKS IN THESE ARRAYS
    // IF YOU WANT TO ADD IMAGES, THIS IS WHERE TO DO IT!
    // MAKE SURE TO LABEL THEM CORRECTLY!
    // OTHERWISE BUTTON USE WON'T MAKE SENSE!


// Going to add types: forestImages, flowingWaterImages, oceanImages, mountainImages, cloudImages,
// they will have the tags: happy, neutral, gloomy (this is based on vibe)
//                          clear, rainy (this is based on weather)
//                          dawn, noon, dusk (this is based on lighting)
//                          also adding sunrise/sunset
// dawn : general morning, noon: sun overhead, dusk: general night
// sunrise/sunset are for clear morning or evening shots! vibes determine day/night again.
// added mist tag :)




// source is [not owned by eosyn or eosyn.net] but is a collection of
// cool looking cinemagraphs put together for people to enjoy.
// all credits to their owners!!! if you would like your link to
// be removed, please contact me!! thanks

// added placeholder season_[x] tags, just one season_autumn for now, because
// that button sounds like it'd be nice later. 

//particular glacier scenes can get the 'cool' tag

// (((( THIS IS THE PLANT IMAGE SET!!! ))))
const plantImages = [
{
    url: 'https://mir-s3-cdn-cf.behance.net/project_modules/source/c2dff114084803.5627d27a94e4b.gif',
    tags: ['neutral', 'clear', 'noon']
}

];

// (((( THIS IS THE FOREST IMAGE SET!!! ))))

const forestImages = [
  {
    url: '/images/forest-sunny-morning.gif',
    tags: ['clear', 'happy', 'morning']
  },

  {
    url: '/images/forest-rainy-night.gif',
    tags: ['rainy', 'gloomy', 'night']
  },

  {
    url: 'https://i.makeagif.com/media/5-24-2021/XNAMrT.gif',
    tags: ['clear', 'happy', 'noon']
  },

  {
    url: 'https://i.gifer.com/origin/2c/2c38872fc58ca653597e6eeaea433fbd.gif',
    tags: ['clear', 'neutral', 'noon']
  },

  {
    url: 'https://mir-s3-cdn-cf.behance.net/project_modules/source/80b61422342197.5631163dc0544.gif',
    tags: ['rainy', 'gloomy', 'noon']
  }, 

  {
    url: 'https://mir-s3-cdn-cf.behance.net/project_modules/source/fb89fb35295351.56f1706fbafaa.gif',
    tags: ['clear', 'gloomy', 'dawn']
  },

  {
    url: 'https://i.pinimg.com/originals/1e/b4/0e/1eb40e8f6c568d75f45bcb41ad97bdf9.gif',
    tags: ['clear', 'happy', 'sunrise']
  }, 

  {
    url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzBuc2xveWh2czNseG8wdHg3dmN4ZmdicHJuYW15dTFmeTN0aml1cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUA7aRkZwuLP7YVSEw/giphy.gif',
    tags: ['clear', 'happy', 'sunrise', 'mist']
  }, 

  {
    url: 'https://i.pinimg.com/originals/c1/41/3a/c1413a777f05d5639012dc8c947ad366.gif',
    tags: ['clear', 'neutral', 'noon', 'mist']
  },

  {
    url: 'https://i.pinimg.com/originals/8d/8c/ac/8d8cacc7074eaeb9178a03b9cc4c788d.gif',
    tags: ['clear', 'sunrise', 'neutral', 'mist']
  },

  {
    url: 'https://i.pinimg.com/originals/d3/e7/86/d3e7868d6e60c884145afb820857e583.gif',
    tags: ['clear', 'sunset', 'neutral', 'mist']
  }, 

  {
    url: 'https://i.pinimg.com/originals/ea/ae/19/eaae197127169573df345cef728ddaf3.gif',
    tags: ['clear', 'sunrise', 'neutral', 'mist']
  },

  {
    url: 'https://i.pinimg.com/originals/77/7d/21/777d210599820ce0321f8d1612f24720.gif',
    tags: ['clear', 'sunrise', 'neutral', 'mist']
  },

  {
    url: 'https://www.greenpeace.org.au/static/planet4-australiapacific-stateless/2024/02/b6a58d41-tumblr_inline_naqd6dfw4e1sbo4ov.gif',
    tags: ['neutral', 'clear', 'noon']
  },

  {
    url: 'https://i.gifer.com/9KLe.mp4',
    tags: ['gloomy', 'rainy', 'dusk', 'mist']
  },

  {
    url: 'https://i.gifer.com/1js5.mp4',
    tags: ['neutral', 'clear', 'mist']
  }

];


// (((( THIS IS THE FLOWING WATER IMAGE SET!!! ))))

const flowingWaterImages =[
{
    url: 'https://64.media.tumblr.com/53338321e155f8a508b719153332f3d5/tumblr_pbkaglO6lB1qan9upo1_r3_640.gif', 
    tags: ['neutral', 'clear', 'noon']
}, 

{
    url: 'https://64.media.tumblr.com/64ef35bdf4fa170d0850e7c20de2efd9/tumblr_pbkajrWcon1qan9upo1_r3_640.gif',
    tags: ['neutral', 'clear', 'noon']
}, 

{
    url: 'https://i.pinimg.com/originals/bc/cb/4f/bccb4f5b594bd492528cdc0a77a30932.gif',
    tags: ['neutral', 'clear', 'noon']
}, 

{
    url: 'https://phoneky.co.uk/thumbs/screensavers/down/new/places/-3_UISOlaSS.gif',
    tags: ['happy', 'clear', 'dusk']
}, 

{
    url: 'https://giffiles.alphacoders.com/989/9890.gif',
    tags: ['happy', 'clear', 'noon']
},

{
    url: 'https://c.tenor.com/TTklC07Jq3YAAAAC/tenor.gif',
    tags: ['happy', 'clear', 'noon']
},

{
    url: 'https://i.redd.it/f6faybknvic11.gif',
    tags: ['neutral', 'clear', 'noon']
},

{
    url: 'https://i.pinimg.com/originals/a9/10/7d/a9107de0bac93255438e8e6570be7cae.gif',
    tags: ['happy', 'clear', 'noon']
},

{
    url: 'https://i.pinimg.com/originals/4c/19/88/4c19889c7a694f34dc49c18854cd6d62.gif',
    tags: ['happy', 'clear', 'noon', 'season_autumn']
},

{
    url: 'https://i.gifer.com/h7O.mp4',
    tags: ['happy', 'clear', 'noon']
},

{
    url: 'https://mir-s3-cdn-cf.behance.net/project_modules/source/ac1dd511481791.560f87b10d097.gif',
    tags: ['gloomy', 'clear', 'noon']
},

{
    url: 'https://mir-s3-cdn-cf.behance.net/project_modules/source/1aacd211481791.560f867dabbbd.gif',
    tags: ['neutral', 'clear', 'noon']
},

{
    url: 'https://i.pinimg.com/originals/74/cc/3c/74cc3cce7eb9c244e935b4a98b58d716.gif',
    tags: ['happy', 'clear', 'noon', 'mist']
},

{
    url: 'https://i.gifer.com/1Eqx.gif',
    tags: ['neutral', 'clear', 'dusk', 'mist']
},

{
    url: 'https://i.gifer.com/2mED.gif',
    tags: ['happy', 'clear', 'noon', 'mist']
},

{
    url: 'https://64.media.tumblr.com/cff581808fbb1b267944cb80dabfd617/6538f68c8d4d089f-db/s540x810/99c87e021b706adc1c567a1d0bc89e5a2f386b48.gif',
    tags: ['gloomy', 'neutral', 'dusk', 'mist', 'cool', 'clear']
},

{
    url: 'https://i.pinimg.com/originals/15/b1/58/15b158a4688d7e4b799520c5288f2ae9.gif',
    tags: ['gloomy', 'dusk', 'mist', 'clear']
},

{
    url: 'https://i.pinimg.com/originals/4e/f2/13/4ef2131d142ca2a308ffaa878992291b.gif',
    tags: ['neutral', 'happy', 'dusk', 'mist', 'clear']
},
{
    url: 'https://i.gifer.com/2qQ1.gif',
    tags: ['gloomy', 'dusk', 'clear']
},

{
    url: 'https://i.gifer.com/1KI2.gif',
    tags: ['happy', 'noon', 'clear']
},

{
    url: 'https://i.gifer.com/fxz5.gif',
    tags: ['happy', 'noon', 'clear', 'mist']
},

{
    url: 'https://gifdb.com/images/high/waterfall-nature-cinemagraph-loop-bubbles-rocks-6178v1bhqqyit8bo.webp',
    tags: ['neutral', 'noon', 'clear']
},

{
    url: 'https://i.gifer.com/CpJm.mp4',
    tags: ['we_all_live_in_a', 'clear', 'noon']
},

{
    url: 'https://i.gifer.com/1KHF.mp4',
    tags: ['neutral', 'noon', 'clear']
},

{
    url: 'https://i.gifer.com/28Jo.mp4',
    tags: ['neutral', 'noon', 'clear']
}

];


// (((( THIS IS THE MOUNTAIN IMAGE SET!!! ))))

const mountainImages =[
    {
        url: 'https://33.media.tumblr.com/ef8cb843f59ef5d012d77ec4718b35ab/tumblr_nvnvatCOHU1sk6vtao1_400.gif',
        tags: ['happy', 'clear', 'dusk']
    }, 

    {
        url: 'https://i.pinimg.com/originals/23/6f/a9/236fa9c337f3db3f6eab41034f58d54b.gif',
        tags: ['happy', 'clear', 'dusk']
    }, 

    {
        url: 'https://stormandsky.com/gif/14.gif',
        tags: ['neutral', 'clear', 'dawn']
    },

    {
        url: 'https://mir-s3-cdn-cf.behance.net/project_modules/source/fb89fb35295351.56f1706fbafaa.gif',
        tags: ['neutral', 'clear', 'dawn', 'mist']
    },

    {
        url: 'https://www.greenpeace.org.au/static/planet4-australiapacific-stateless/2024/02/578210d6-tumblr_njzjlss9h71tv1qiho1_1280.gif',
        tags: ['happy', 'clear', 'noon', 'mist']
    }, 

    {
        url: 'https://i.gifer.com/PuRn.mp4',
        tags: ['neutral', 'clear', 'noon', 'mist']
    }, 
];

// (((( THIS IS THE CLOUD & SKY IMAGE SET!!! ))))

const cloudImages =[
    {
        url: 'https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif',
        tags: ['happy', 'clear', 'noon']
    }, 

    {
        url: 'https://giffiles.alphacoders.com/178/17826.gif',
        tags: ['gloomy', 'rainy', 'noon']
    },  

    {
        url: 'https://twistedsifter.com/wp-content/uploads/2015/02/looping-gifs-of-supercell-thunderstorms-4.gif?w=800',
        tags: ['neutral', 'clear', 'dawn']
    }, 


    {
        url: 'https://i.gifer.com/fyMN.gif',
        tags: ['happy', 'clear', 'dawn', 'sunrise']
    },

    {
        url: 'https://i.gifer.com/g2B1.mp4',
        tags: ['gloomy', 'rainy', 'dusk']
    },

    {
        url: '',
        tags: []
    }, 

    {
        url: '',
        tags: []
    }, 
];

// i'm including oceans and lakes here ok leave me alone
// delete it yourself you coward

// (((( THIS IS THE OCEAN & LAKE IMAGE SET!!! ))))
const oceanImages = [
    {
        url: 'https://i.pinimg.com/originals/d1/bc/be/d1bcbe5854709126d6ce90dbdf28bac1.gif',
        tags: ['happy', 'clear', 'noon']
    }, 

    {
        url: 'https://i.gifer.com/EE0D.mp4',
        tags: ['neutral', 'clear', 'noon']
    }
];

// (((( THIS IS THE TECH IMAGE SET!!! ))))
const techImages = [
{
    url: 'https://gifdb.com/images/high/cinemagraph-altered-carbon-1kmkhvyzciq4b6hk.webp',
    tags: ['neutral', 'clear', 'dusk']
},

{
    url: 'https://gifdb.com/images/high/nyc-subway-cinemagraph-k38b2u4s8xfu73wt.webp',
    tags: ['neutral', 'clear', 'dusk', 'dawn']
},

{
    url: 'https://gifdb.com/images/high/cinemagraph-rainy-night-lights-dpfxtm3egbohw6k9.webp',
    tags: ['rainy', 'gloomy', 'dusk'] 
},

{
    url: 'https://i.gifer.com/Ejw6.mp4',
    tags: ['pretzel']
},
// don't get it twisted
// or maybe do?
// idk, i'm not your mom
// [AS]
{
    url: 'https://i.gifer.com/fxba.mp4',
    tags: ['rainy', 'gloomy', 'noon']
},

{
    url: 'https://i.gifer.com/HrnI.mp4',
    tags: ['neutral', 'clear']
},

{
    url: 'https://i.gifer.com/CH6Y.mp4',
    tags: ['neutral', 'clear']
},

{
    url: 'https://i.gifer.com/IEVM.mp4',
    tags: ['gloomy', 'dusk', 'clear']
}

];      


// (((( THIS IS THE ANIME IMAGE SET!!! ))))
const animeImages = [
{
    url: 'https://i.gifer.com/fzrN.mp4',
    tags: ['gloomy', 'rainy', 'dusk']
}
];


// This picks a random image from any of these groups regardless of tag

const imageGroups = {
    forest: forestImages,
    flowingWater: flowingWaterImages,
    ocean: oceanImages,
    clouds: cloudImages,
    mountains: mountainImages,
    tech: techImages,
    anime: animeImages,
    plants: plantImages,
    random: [...forestImages, ...flowingWaterImages, ...oceanImages, ...cloudImages, ...mountainImages, ...techImages, ...animeImages, ...plantImages]
    };


    const imageContainer = document.getElementById('imageContainer');
    const imageCredits = document.getElementById('imageCredits');
    const filterContainer = document.getElementById('filter-container');

    let currentFilters = { group: 'all', vibe: 'all', weather: 'all', time: 'all' };

    function filterAndDisplayImage() {
        let availableImages = [];

        // 1. Select images based on the chosen group
        if (currentFilters.group === 'all') {
            // Flatten all groups into one array if 'all' is selected
            availableImages = Object.values(imageGroups).flat();
        } else {
            availableImages = imageGroups[currentFilters.group] || [];
        }

        // 2. Filter the selected group by other tags
        const filtered = availableImages.filter(image => {
            const vibeMatch = currentFilters.vibe === 'all' || image.tags.includes(currentFilters.vibe);
            const weatherMatch = currentFilters.weather === 'all' || image.tags.includes(currentFilters.weather);
            const timeMatch = currentFilters.time === 'all' || image.tags.includes(currentFilters.time);
            return vibeMatch && weatherMatch && timeMatch;
        });

        if (filtered.length > 0) {
            const randomIndex = Math.floor(Math.random() * filtered.length);
            const selectedImage = filtered[randomIndex];
            imageContainer.style.backgroundImage = `url('${selectedImage.url}')`;
            imageCredits.textContent = `Credit: ${selectedImage.url.split('/').pop()}`;
            imageCredits.style.display = 'block';
        } else {
            imageContainer.style.backgroundImage = 'none';
            imageCredits.textContent = 'No images match the current filters.';
            imageCredits.style.display = 'block';
        }
    }

    filterContainer.addEventListener('click', function(e) {
        const button = e.target.closest('.glass-button');
        if (!button) return;
        const filterType = button.dataset.filterType;
        const filterValue = button.dataset.filter;
        if (filterType) {
            currentFilters[filterType] = filterValue;
            const parentGroup = button.parentElement;
            parentGroup.querySelector('.glass-button.active')?.classList.remove('active');
            button.classList.add('active');
            filterAndDisplayImage();
        }
    });
    filterAndDisplayImage();
});
</script>

</div>
</div>
