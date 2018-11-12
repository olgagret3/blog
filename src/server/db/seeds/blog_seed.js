exports.seed = (knex, Promise) => {
  return knex('blog').del()
  .then(() => {
    return knex('blog').insert({
      picture: 'picture/1.jpg',
      name: 'Маленький принц',
      text: 'Voici mon secret. Il est tres simple: on ne voit bien qu’avec le coeur. L’essentiel est invisible pour les yeux. Вот мой секрет, он очень прост: зорко одно лишь сердце. Самого главного глазами не увидишь.',
      tag: 'цитата, литература'
    });
  })
  .then(() => {
    return knex('blog').insert({
      picture: 'picture/2.jpg',
      name: 'Лучший друг человека',
      text: 'Наверное, у каждого человека есть свое любимое домашнее животное. У большинства моих одноклассников и друзей живут дома кошки, хомяки, собаки. Мне кажется, что жизнь без питомца станет скучной, ведь, сколько радости приносят нам эти пушистые создания.',
      tag: 'домашнее животное, дружба'
    });
  })
  .then(() => {
    return knex('blog').insert({
      picture: 'picture/3.jpg',
      name: 'Путешествие',
      text: ' Путешествие – всегда что-то интересное, это встреча с новыми людьми, городами и достопримечательностями. Путешествие всегда дарит новые эмоции и впечатления, оно позволяет отвлечься от повседневной жизни и окунуться в новую другую жизнь.',
      tag: 'путешествие'
    });
  });
};
