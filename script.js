
/**
 * VIEW
 */
const View = (() => {

    const domobj = {
        addbtn: '#submit',
        table: '#summaryTable',
        tablebody: '#tablebody',
        inputname: 'name',
        inputmobile: 'mobile',
        inputemail: 'email',
        errordiv: '#error',
        search: '#search',
        noresult: '#noResult'

    };

    const render = (ele, tmp) => {
        ele.innerHTML = tmp;
    }

    const createTable = (arr) => {
        let tmp = '';

        arr.forEach((value, index, array) => {

            tmp += `
                        <tr>
                        <td>${value.name}</td>
                        <td>${value.mobile}</td>
                        <td>${value.email}</td>
                        </tr>
                    `;
        });

        return tmp;
    }

    return {
        domobj,
        render,
        createTable
    }
})()


/**
 * MODEL
 */
const Model = ((view) => {

    class Contact {
        constructor(name, mobile, email) {
            this.name = name;
            this.mobile = mobile;
            this.email = email;
        }
    }

    class State {
        #contactlist = [];
        #contacts = [];

        get contacts(){
            return this.#contacts;
        }

        set contacts(list){
            this.#contacts = [...list];
        }

        get contactlist() {
            return this.#contactlist;
        }

        set contactlist(newList) {
            this.#contactlist = [...newList];

            const tablebody = document.querySelector(view.domobj.tablebody)
            const tmp = view.createTable(this.#contactlist);
            view.render(tablebody, tmp);

        }
    }

    return {
        Contact,
        State
    }
})(View)



/**
 * CONTROLLER
 */
const Controller = ((view, model) => {

    const state = new model.State();
    let { domobj } = view;


    const addContact = () => {
        const btn = document.querySelector(domobj.addbtn);
        const error = document.querySelector(domobj.errordiv);

        btn.addEventListener('click', (event) => {
            let name = document.getElementById(domobj.inputname);
            let email = document.getElementById(domobj.inputemail);
            let mobile = document.getElementById(domobj.inputmobile);
            const arr = [name, email, mobile];

            if (isValid(...arr)) {
                const contact = new model.Contact(name.value, mobile.value, email.value);

                state.contacts = [contact, ...state.contacts];
                state.contactlist = [...state.contacts];
                error.classList.add("dn");

                arr.forEach(element => {
                    element.value = '';
                });

            } else {
                error.classList.remove("dn");
            }
        })
    }

    const searchMobile = () => {
        const search = document.querySelector(domobj.search);
        const noResult = document.querySelector(domobj.noresult);

        search.addEventListener('keyup', (event) => {
            // console.log(state.contactlist);
            console.log(event.target.value);
            if(event.target.value.length > 0){

                // model.search = event.target.value;

                function checkMobile(number) {
                    return number.mobile.includes(event.target.value);
                }

                state.contactlist = [...state.contacts.slice().filter(checkMobile)];

                if(state.contactlist.length == 0){
                    noResult.classList.remove("dn");
                } else {
                    noResult.classList.add("dn");
                }
                
            } else {
                state.contactlist = [...state.contacts];
                noResult.classList.add("dn");
            }
            
        })
    }

    const isValid = (name, email, mobile) => {
        let nameTmp = name.value.trim();
        let emailTmp = email.value.trim();
        let mobileTmp = mobile.value.trim();

        if ((nameTmp.length >= 1 && nameTmp.length <= 20)) {
            if (/^[a-zA-Z\s]+$/.test(nameTmp)) {
                if (/^[0-9]+$/.test(mobileTmp) && mobileTmp.length == 10) {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailTmp) && emailTmp.length < 40) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    const bootstrap = () => {
        addContact();
        searchMobile();
    }

    return { bootstrap }

})(View, Model)

Controller.bootstrap();