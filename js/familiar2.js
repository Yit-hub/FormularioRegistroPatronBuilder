const addFamilyButton = document.getElementById('add-family-button');
const familiar2Fieldset = document.querySelector('.familiar2');
let removeFamilyButton;

addFamilyButton.addEventListener('click', () => {
    // Mostrar el segundo familiar
    familiar2Fieldset.style.display = 'block';

    // Crear el botón para eliminar si no existe
    if (!removeFamilyButton) {
        removeFamilyButton = document.createElement('button');
        removeFamilyButton.type = 'button';
        removeFamilyButton.textContent = 'Eliminar Familiar';
        removeFamilyButton.id = 'remove-family-button';
        addFamilyButton.after(removeFamilyButton);

        // Agregar funcionalidad para eliminar el segundo familiar
        removeFamilyButton.addEventListener('click', () => {
            familiar2Fieldset.style.display = 'none';
            removeFamilyButton.remove();
            removeFamilyButton = null;
        });
    }
});