
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
        search: '#search'

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
    /*
        addbtn: '#submit',
        table: '#summaryTable',
        tablebody: '#tablebody',
        inputname: '#name',
        inputmobile: '#mobile',
        inputemail: '#email',
    */


    const addContact = () => {
        const btn = document.querySelector(domobj.addbtn);
        const error = document.querySelector(domobj.errordiv);

        btn.addEventListener('click', (event) => {
            let name = document.getElementById(domobj.inputname);
            let email = document.getElementById(domobj.inputemail);
            let mobile = document.getElementById(domobj.inputmobile);
            const arr = [name, email, mobile];

            if (isValid(...arr)) {
                const contact = new model.Contact(name.value, email.value, mobile.value);

                state.contactlist = [contact, ...state.contactlist];
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


        search.addEventListener('keyup', (event) => {
            console.log(state.contactlist);

            function cb(acc, initial){
                // if(){
                    
                // }
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