import { dishes } from './dishes.js';
import { weekDishMap } from './weekDishMap.js';

function updateFlyer(dish) {
    document.getElementById('dish-name').textContent = dish.name;
    document.getElementById('dish-image').src = dish.image;
    document.getElementById('price-dinein').textContent = dish.priceDineIn;
    document.getElementById('price-togo').innerHTML = dish.priceToGo;
}

function getCurrentWeekIndex() {
    const date = new Date();
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
    console.log(`Aktuelles Datum: ${date.toDateString()}, Kalenderwoche: ${weekNumber}`);
    return weekNumber;
}

let currentIndex = getCurrentWeekIndex();
let isFirstClick = true;

function nextDish() {
    const weekDisplay = document.getElementById('week-display');
    currentIndex = (currentIndex % Object.keys(weekDishMap).length) + 1;

    if (isFirstClick) {
        weekDisplay.textContent = "nächste Woche";
        isFirstClick = false;
    } else {
        weekDisplay.textContent = `Kalenderwoche ${currentIndex}`;
    }
    
    updateFlyer(weekDishMap[currentIndex]);
}

const currentWeekIndex = getCurrentWeekIndex();
const initialDish = weekDishMap[currentWeekIndex] || dishes[0]; // Standard auf erstes Gericht, falls keine Zuordnung vorhanden
updateFlyer(initialDish);

// Expose nextDish and startTour to global scope
window.nextDish = nextDish;
window.startTour = function() {
    introJs().setOptions({
        steps: [
            {
                intro: "Willkommen bei der geführten Tour durch unseren neuen HTML-Flyer!"
            },
            {
                element: document.querySelector('.header'),
                intro: "Ihr Logo in Szene gesetzt vor der Höri und einer modernen, stilisierten Grafik."
            },
            {
                element: document.querySelector('.content'),
                intro: "Hier sehen Sie Ihre wöchentlich wechselnden Gerichte, die dynamisch nach Kalenderwoche angezeigt werden."
            },
            {
                element: document.getElementById('dish-name'),
                intro: "Der Name und das Bild des Gerichts aktualisieren sich automatisch."
            },
            {
                element: document.querySelector('.price'),
                intro: "Unterschiedliche Preise für Dine-In und To-Go."
            },
            {
                element: document.querySelector('.footer'),
                intro: "Im Footer finden Sie ihre Kontaktinformationen, die direkte Links zu Ihren anderen Formaten sind."
            },
            {
                intro: "Warum HTML und nicht nur ein PNG-Bild? Mit HTML können wir SEO verbessern, da Suchmaschinen nur so den Text lesen können. Außerdem sind unsere Inhalte zugänglicher für Menschen mit Behinderungen, die Screenreader verwenden. All diese Vorteile helfen, die Sichtbarkeit und Benutzerfreundlichkeit unserer Inhalte zu erhöhen."
            },
            {
                intro: "Um die Gerichte zu ändern, bearbeiten Sie einfach eine Datei. Hier können Sie den Namen, das Bild und die Preise für jedes Gericht anpassen. Fügen Sie einfach ein Foto des neuen Gerichts hinzu und passen Sie den Namen und Preis an."
            },
            {
                intro: "Die Zuordnung der Gerichte zu den Kalenderwochen finden Sie im Skript. Hier legen Sie fest, welches Gericht in welcher Woche angezeigt wird. Diese HTML-Datei kann dann auf die internen Displays im Laden übertragen werden, um die Gerichte/Waren dynamisch anzuzeigen."
            }
            
        ]
    }).start();
};
