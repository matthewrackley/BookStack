
class PermissionsTable {

    setup() {
        this.container = this.$el;

        // Handle toggle all event
        for (const toggleAllElem of (this.$manyRefs.toggleAll || [])) {
            toggleAllElem.addEventListener('click', this.toggleAllClick.bind(this));
        }

        // Handle toggle row event
        for (const toggleRowElem of (this.$manyRefs.toggleRow || [])) {
            toggleRowElem.addEventListener('click', this.toggleRowClick.bind(this));
        }

        // Handle toggle column event
        for (const toggleColElem of (this.$manyRefs.toggleColumn || [])) {
            toggleColElem.addEventListener('click', this.toggleColumnClick.bind(this));
        }
    }

    toggleAllClick(event) {
        event.preventDefault();
        this.toggleAllInElement(this.container);
    }

    toggleRowClick(event) {
        event.preventDefault();
        this.toggleAllInElement(event.target.closest('tr'));
    }

    toggleColumnClick(event) {
        event.preventDefault();

        const tableCell = event.target.closest('th,td');
        const colIndex = Array.from(tableCell.parentElement.children).indexOf(tableCell);
        const tableRows = tableCell.closest('table').querySelectorAll('tr');
        const inputsToToggle = [];

        for (let row of tableRows) {
            const targetCell = row.children[colIndex];
            if (targetCell) {
                inputsToToggle.push(...targetCell.querySelectorAll('input[type=checkbox]'));
            }
        }
        this.toggleAllInputs(inputsToToggle);
    }

    toggleAllInElement(domElem) {
        const inputsToToggle = domElem.querySelectorAll('input[type=checkbox]');
        this.toggleAllInputs(inputsToToggle);
    }

    toggleAllInputs(inputsToToggle) {
        const currentState = inputsToToggle.length > 0 ? inputsToToggle[0].checked : false;
        for (let checkbox of inputsToToggle) {
            checkbox.checked = !currentState;
            checkbox.dispatchEvent(new Event('change'));
        }
    }

}

export default PermissionsTable;