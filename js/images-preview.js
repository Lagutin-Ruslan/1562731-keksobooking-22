const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview > img');
const photosChooser = document.querySelector('#images');
const previewPhotos = document.querySelector('.ad-form__photo');

//avatar
avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

//photos недвижимости
photosChooser.addEventListener('change', () => {
  const file = photosChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewPhotos.style.backgroundColor = '';
      const img = document.createElement('img');
      img.classList.add('ad-form__photo-offer');
      previewPhotos.appendChild(img);
      img.width = '70';
      img.height = '70';
      img.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

export {previewAvatar, previewPhotos};
