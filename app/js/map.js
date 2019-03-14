ymaps.ready(init);

var placemarks = [
    {
        latitude: 59.94,
        longitude: 30.38,
        hintContent: '<div class="map__hint">Суворовский проспект, д. 48</div>',
        balloonContent: [
            '<div class="map__balloon">',
            'Лучшая еда для быстрого перекуса! Заходите по адресу: ',
            '<span>',
            'Суворовский проспект, д. 48 ',
            '</span>',
            '</div>'
        ]
    },
    {
        latitude: 59.97,
        longitude: 30.31,
        hintContent: '<div class="map__hint">ул. Профессора Попова, д.14</div>',
        balloonContent: [
            '<div class="map__balloon">',
            'Мы используем только органические продукты! Заходите по адресу: ',
            '<span>',
            'ул.Профессора Попова, д.14',
            '</span',
            '</div>'
        ]
    },
    {
        latitude: 59.89,
        longitude: 30.32,
        hintContent: '<div class="map__hint">Московский проспект, д. 105</div>',
        balloonContent: [
            '<div class="map__balloon">',
            'Самые вкусные бургеры у нас! Заходите по адресу: ', 
            '<span>',
            'Московский проспект, д.105',
            '</span',
            '</div>'
        ]
    }
],
    geoObjects= [];

function init() {
    var map = new ymaps.Map('map', {
        center: [59.94, 30.32],
        zoom: 12,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });

    for (var i = 0; i < placemarks.length; i++) {
            geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent.join('')
            },
            
            {
                iconLayout: 'default#image',
                iconImageHref: './images/map-marker.svg',
                iconImageSize: [46, 57],
                iconImageOffset: [-23, -57],
               // iconImageClipRect: [[0, 0], [46, 57]]
            });
    }

    var clusterer = new ymaps.Clusterer({
        clusterIcons: [
            {
                href: './images/drops-full.png',
                size: [50, 50],
                offset: [-25, -25]
            }
        ],
        clusterIconContentLayout: null
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}