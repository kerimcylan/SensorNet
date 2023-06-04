import i18next from 'i18next';
import Backend from 'i18next-fs-backend';

const backend = new Backend({
    loadPath: '/locales/{{lng}}/{{ns}}.json',
});

i18next.use(backend)
    .init({
        debug: true,
        
})