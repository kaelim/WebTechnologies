var myViewFinderArray = new Array();

class ViewFinder {
    //my image junk

    constructor(title, image, info, author, year) {
        this.title = title;
        this.image = image;
        this.info = info;
        this.author = author;
        this.year = year;
    }

    toString() {
        return "Title: " + this.title ;
    }
    toString1() {
      return  "Description: " + this.info ;
    }

    toString2() {
        return "Author: " + this.author;
    }

    toString3() {
        return this.year;
    }
    get theTitle() {
        return this.title;
    }

}

    function initializeArray() {
        var myViewFinder = new ViewFinder('ICE Protest', 'images/ICE.jpeg', 'Una protesta contra las redadas de ICE en Los Angeles, California', 'REUTERS', 'Feburary 3, 2025');
        var myViewFinder1 = new ViewFinder('Islamophobia Protest', 'images/Islam.jpeg', 'Thousands joined the Paris march saying they were fed up with anti-Muslim discrimination.', 'Lisa Bryant', 'November 10, 2019');
        var myViewFinder2 = new ViewFinder('Abortion', 'images/Abortion.jpeg','Protesters at the Supreme Court in April. A record percentage of Americans are now declaring themselves single-issue voters on abortion rights','Haiyun Jiang', 'June 24, 2024');
        var myViewFinder3 = new ViewFinder('Federal Funding', 'images/Flag.jpeg','An upside-down American flag hangs from El Capitan near Yosemite National Parks Horsetail Fall on Saturday to protest the thousands of federal job cuts made by President Donald Trumps administration.', 'Tracy Barbutes','Feburary 22, 2025');
        var myViewFinder4 = new ViewFinder('Elon', 'images/elon.jpeg', 'People gather to protest against the far-right Alternative for Germany, or AfD party, and right-wing extremism in front of the Brandenburg Gate in Berlin on Saturday.y','Ebrahim Noroozi','Juanuary 27, 2025');

        myViewFinderArray.push(myViewFinder);
        myViewFinderArray.push(myViewFinder1);
        myViewFinderArray.push(myViewFinder2);
        myViewFinderArray.push(myViewFinder3);
        myViewFinderArray.push(myViewFinder4);
}

function accessInformation() {
    var randomNumber = Math.floor(Math.random() * myViewFinderArray.length);
    var selectedViewFinder = myViewFinderArray[randomNumber];

    document.getElementById("title").innerHTML = myViewFinderArray[randomNumber].toString();
    document.getElementById("image").src = selectedViewFinder.image;
    document.getElementById("info").innerHTML = myViewFinderArray[randomNumber].toString1();
    document.getElementById("author").innerHTML = myViewFinderArray[randomNumber].toString2();
    document.getElementById("year").innerHTML = myViewFinderArray[randomNumber].toString3();
}

