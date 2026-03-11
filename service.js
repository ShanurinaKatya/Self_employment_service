window.onload = function() {
    let a = '' // первое число
    let b = '' // второе число
    let expressionResult = '' // результат вычисления
    let selectedOperation = null // выбранная операция

    const outputElement = document.getElementById("total-result")
    const orderButton = document.getElementById("order-button")
    const orderMessage = document.querySelector(".order-message")

    // Выбираем все кнопки с цифрами
    const digitButtons = document.querySelectorAll('[id ^= "service_"]');

    // Функция обработки нажатия на цифровые кнопки
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            // Вводим первое число
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
                a += digit;
            }
            outputElement.innerHTML = a || '0';
        } else {
            // Вводим второе число
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
                b += digit;
                outputElement.innerHTML = b || '0';
            }
        }
    }

    // Обработчики для цифровых кнопок
    digitButtons.forEach(button => {
        const buttonText = button.innerHTML;
        if (!isNaN(buttonText) || buttonText === '.') {
            button.onclick = function() {
                const digitValue = button.innerHTML;
                onDigitButtonClicked(digitValue);
            }
        }
    });

    // Обработчик для кнопки очистки (C)
    document.getElementById("action_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = null
        expressionResult = ''
        outputElement.innerHTML = '0'
    }

    // Обработчик для кнопки смены знака (+/-)
    document.getElementById("action_sign").onclick = function() {
        if (!selectedOperation) {
            if (a === '') return;
            a = (-(+a)).toString();
            outputElement.innerHTML = a;
        } else {
            if (b === '') return;
            b = (-(+b)).toString();
            outputElement.innerHTML = b;
        }
    }


    document.getElementById("action_percent").onclick = function() {
        if (a === '') return;

        if (!selectedOperation) {
            a = ((+a) / 100).toString();
            outputElement.innerHTML = a;
        } else if (b !== '') {
            // Если есть второе число, вычисляем процент от первого числа
            let percent = ((+a) * (+b) / 100).toString();
            b = percent;
            outputElement.innerHTML = b;
        }
    }


    document.getElementById("service_multiply").onclick = function() {
        if (a === '') return;
        selectedOperation = 'x';
    }

    document.getElementById("service_plus").onclick = function() {
        if (a === '') return;
        selectedOperation = '+';
    }

    document.getElementById("service_minus").onclick = function() {
        if (a === '') return;
        selectedOperation = '-';
    }

    document.getElementById("service_divide").onclick = function() {
        if (a === '') return;
        selectedOperation = '/';
    }


    document.getElementById("service_calculate").onclick = function() {
        if (a === '' || b === '' || !selectedOperation)
            return

        switch (selectedOperation) {
            case 'x':
                expressionResult = (+a) * (+b);
                break;
            case '+':
                expressionResult = (+a) + (+b);
                break;
            case '-':
                expressionResult = (+a) - (+b);
                break;
            case '/':
                if (+b === 0) {
                    outputElement.innerHTML = 'Ошибка';
                    return;
                }
                expressionResult = (+a) / (+b);
                break;
            default:
                return;
        }

        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
    }

    document.getElementById("theme-toggle").onclick = function() {
        document.body.classList.toggle('dark-theme');
    };

    orderButton.onclick = function() {
        orderMessage.classList.add('show');

        setTimeout(function() {
            orderMessage.classList.remove('show');
        }, 3000);
    };

    // Скрываем сообщение при загрузке страницы
    orderMessage.classList.remove('show');

};
