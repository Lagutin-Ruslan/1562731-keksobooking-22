const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview > img');
const photosChooser = document.querySelector('#images');
const previewPhotos = document.querySelector('.ad-form__photo');


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


photosChooser.addEventListener('change', () => {
  const file = photosChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previewPhotos.style.backgroundImage = `url(${reader.result})`;
      previewPhotos.style.backgroundSize =  '70px 70px';
    });
    reader.readAsDataURL(file);
  }
});

export {previewAvatar, previewPhotos};
