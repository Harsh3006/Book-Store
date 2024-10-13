from books.serializers import BookSerializer

books = [
    {
        "title": "1984",
        "author": "George Orwell",
        "category": "Dystopian",
        "genre": "Science Fiction",
        "description": "1984 is a gripping and haunting portrayal of a totalitarian society under constant surveillance and the struggle for individuality and truth. Set in a dystopian future, the novel follows the life of Winston Smith, a low-ranking member of the ruling Party.\r\n\r\nIn the oppressive world of Oceania, Big Brother, the Party's enigmatic leader, wields absolute power over the minds and actions of its citizens. Winston, who secretly despises the Party's regime, begins a forbidden affair with Julia, a fellow Party member. Together, they venture into the depths of rebellion against the omnipresent surveillance and censorship.\r\n\r\nAs Winston's rebellious thoughts and actions increase, he becomes entangled in a web of deceit and betrayal. The novel explores themes of oppression, surveillance, propaganda, and the manipulation of truth. It serves as a warning against the dangers of authoritarianism and the erosion of individual freedom.\r\n\r\n1984 is a chilling and thought-provoking novel that remains relevant in the modern world, where concerns about privacy, propaganda, and the abuse of power persist.",
        "publication_date": "1949-06-08",
        "price": "399.00",
        "customer_rating": "4.7",
        "count_in_stock": 11
    },
    {
        "title": "A Game of Thrones",
        "author": "George R.R. Martin",
        "category": "Fiction",
        "genre": "Fantasy",
        "description": "A Game of Thrones is the first book in the epic fantasy series A Song of Ice and Fire. Set in the fictional continents of Westeros and Essos, the novel follows the political intrigues, power struggles, and conflicts among noble families as they vie for control of the Iron Throne. With its complex characters, intricate plotlines, and vivid world-building, George R.R. Martin's fantasy masterpiece has become a cultural phenomenon. A Game of Thrones is a tale of honor, treachery, and the consequences of choices made in a world where the line between good and evil is blurred. The series has captivated readers with its unpredictable twists and turns, and its exploration of themes such as power, morality, and the human capacity for both heroism and villainy.",
        "publication_date": "1996-08-06",
        "price": "449.00",
        "customer_rating": "5.0",
        "count_in_stock": 6
    },
    {
        "title": "Becoming",
        "author": "Michelle Obama",
        "category": "Autobiography",
        "genre": "Biography",
        "description": "In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the world’s most famous address.",
        "publication_date": "2018-11-13",
        "price": "699.00",
        "customer_rating": "4.9",
        "count_in_stock": 15
    },
    {
        "title": "Brave New World",
        "author": "Aldous Huxley",
        "category": "Fiction",
        "genre": "Dystopian",
        "description": "Brave New World is a dystopian novel that presents a chilling vision of a future society where citizens are genetically engineered and conditioned to fulfill specific roles in a rigidly controlled world order. Aldous Huxley's prophetic narrative explores themes of individuality, conformity, and the dangers of a dehumanized society. Through the story of Bernard Marx and his encounter with John the Savage, a man from the 'Savage Reservation,' Huxley challenges the reader to reflect on the nature of freedom, happiness, and the cost of sacrificing personal autonomy for societal stability. Brave New World remains a classic work of dystopian fiction that raises timeless questions about the human condition and the potential pitfalls of an increasingly technocratic society.",
        "publication_date": "1932-01-01",
        "price": "399.00",
        "customer_rating": "4.4",
        "count_in_stock": 7
    },
    {
        "title": "Educated",
        "author": "Tara Westover",
        "category": "Non-fiction",
        "genre": "Memoir",
        "description": "Educated is a compelling memoir that chronicles Tara Westover's journey from growing up in a strict and isolated household in rural Idaho to earning a PhD from Cambridge University. Despite facing familial turmoil and lacking formal education until her late teens, Westover's thirst for knowledge and determination propelled her to overcome significant challenges. With honesty and vulnerability, she explores the power of education to transform lives and the complexities of reconciling personal identity with the expectations of family and community. Educated is a remarkable testament to the resilience of the human spirit and the pursuit of intellectual freedom.",
        "publication_date": "2018-02-20",
        "price": "399.00",
        "customer_rating": "4.7",
        "count_in_stock": 1
    },
    {
        "title": "Harry Potter and the Sorcerer's Stone",
        "author": "J.K. Rowling",
        "category": "Fantasy",
        "genre": "Adventure",
        "description": "Harry Potter and the Sorcerer's Stone is the first book in the enchanting Harry Potter series, written by the beloved British author J.K. Rowling. The story follows the young and orphaned Harry Potter, who learns on his eleventh birthday that he is a wizard and has a place at Hogwarts School of Witchcraft and Wizardry.\r\n\r\nHarry, who has been living a miserable life with his neglectful relatives, the Dursleys, is introduced to the magical world where he discovers his true identity and his connection to the famous wizarding world. At Hogwarts, Harry befriends Hermione Granger and Ron Weasley, forming an unbreakable trio that embarks on numerous adventures together.\r\n\r\nAs Harry settles into the wondrous world of magic, he learns about the dark history of Lord Voldemort, the evil wizard who murdered his parents and tried to kill him as a baby. With the help of his friends and his wise mentor Albus Dumbledore, Harry navigates through challenges and unravels the mysteries surrounding his past.\r\n\r\nThe novel is a delightful combination of magic, friendship, and bravery, captivating readers of all ages. It touches on themes of courage, loyalty, and the power of love and friendship. Harry Potter and the Sorcerer's Stone is a timeless classic that has ignited the imagination of millions and continues to be a beloved literary treasure.",
        "publication_date": "1997-06-26",
        "price": "349.00",
        "customer_rating": "4.9",
        "count_in_stock": 25
    },
    {
        "title": "Pride and Prejudice",
        "author": "Jane Austen",
        "category": "Fiction",
        "genre": "Romance",
        "description": "Pride and Prejudice is a timeless romance novel that explores the complexities of love and societal expectations in 19th-century England. The story revolves around Elizabeth Bennet, a witty and independent-minded young woman, and Mr. Darcy, a proud and reserved gentleman. As their paths cross and misunderstandings arise, Jane Austen skillfully weaves a tale of misunderstandings, personal growth, and the power of overcoming prejudice. With its sparkling dialogue, memorable characters, and social commentary, Pride and Prejudice has become a classic of English literature that continues to enchant readers with its exploration of love, marriage, and the pursuit of happiness.",
        "publication_date": "1813-01-28",
        "price": "299.00",
        "customer_rating": "4.8",
        "count_in_stock": 4
    },
    {
        "title": "Quiet: The Power of Introverts in a World That Can't Stop Talking",
        "author": "Susan Cain",
        "category": "Non-fiction",
        "genre": "Psychology",
        "description": "Quiet: The Power of Introverts in a World That Can't Stop Talking is an exploration of introversion and its valuable contributions in a society that often values extroversion. Susan Cain challenges cultural assumptions and sheds light on the strengths of introverts, such as their capacity for deep thinking, empathy, and creativity. Through research, personal stories, and interviews, Cain uncovers the power and potential of introverts, offering insights into how they can thrive in an extroverted world. Quiet provides a fresh perspective on personality traits, workplace dynamics, and the importance of creating environments that honor and accommodate the needs of introverts.",
        "publication_date": "2012-01-24",
        "price": "299.00",
        "customer_rating": "4.5",
        "count_in_stock": 2
    },
    {
        "title": "Sapiens: A Brief History of Humankind",
        "author": "Yuval Noah Harari",
        "category": "Non-fiction",
        "genre": "History",
        "description": "Sapiens explores how Homo sapiens became the dominant species and examines significant events that shaped the human journey—from the emergence of agriculture and money to the spread of empires and the rise of science.",
        "publication_date": "2014-07-15",
        "price": "599.00",
        "customer_rating": "4.8",
        "count_in_stock": 18
    },
    {
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "category": "Fiction",
        "genre": "Fantasy",
        "description": "The Alchemist is a mesmerizing tale of self-discovery and the pursuit of one's dreams. Santiago, a young Andalusian shepherd, embarks on a journey to find a hidden treasure, guided by omens and signs. Along the way, he encounters the enigmatic Alchemist, who imparts wisdom about the true meaning of life and the importance of listening to one's heart. Paulo Coelho's allegorical novel weaves together themes of destiny, spirituality, and the transformative power of following one's personal legend. With its lyrical prose and profound insights, The Alchemist has captivated millions of readers worldwide and continues to inspire people to follow their dreams.",
        "publication_date": "1988-01-01",
        "price": "299.00",
        "customer_rating": "4.7",
        "count_in_stock": 6
    },
    {
        "title": "The Book Thief",
        "author": "Markus Zusak",
        "category": "Fiction",
        "genre": "Historical",
        "description": "The Book Thief is a poignant and haunting tale set during World War II. Narrated by Death, the story follows Liesel Meminger, a young girl living in Nazi Germany, as she discovers the power of words and storytelling. Amid the horrors of war, Liesel finds solace in stolen books and forms unlikely friendships. Markus Zusak's lyrical prose and unique narrative perspective create a captivating reading experience. With its exploration of love, loss, and the resilience of the human spirit, The Book Thief is a testament to the enduring power of literature in the face of adversity.",
        "publication_date": "2005-03-14",
        "price": "349.00",
        "customer_rating": "2.5",
        "count_in_stock": 8
    },
    {
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "category": "Fiction",
        "genre": "Coming-of-age",
        "description": "The Catcher in the Rye is a classic coming-of-age novel that captures the disillusionment of youth. Narrated by Holden Caulfield, a disenchanted teenager expelled from prep school, the novel explores themes of alienation, identity, and the search for meaning in an adult world that Holden perceives as hypocritical and phony. J.D. Salinger's iconic novel is known for its distinctive voice, sharp observations, and candid portrayal of teenage angst. With its timeless portrayal of adolescent rebellion and longing for authenticity, The Catcher in the Rye remains a seminal work in American literature that resonates with readers of all generations.",
        "publication_date": "1951-07-16",
        "price": "199.00",
        "customer_rating": "4.4",
        "count_in_stock": 8
    },
    {
        "title": "The Chronicles of Narnia",
        "author": "C.S. Lewis",
        "category": "Fiction",
        "genre": "Fantasy",
        "description": "The Chronicles of Narnia is a beloved series of seven fantasy novels that transport readers to the magical land of Narnia. From the discovery of a wardrobe that serves as a gateway to Narnia in The Lion, the Witch and the Wardrobe to the epic battles between good and evil in The Last Battle, C.S. Lewis' timeless tales captivate readers of all ages. The books follow a group of children who become the central figures in Narnia's history, as they encounter talking animals, mythical creatures, and embark on incredible adventures. Through richly imagined worlds and memorable characters, Lewis explores themes of bravery, loyalty, and the enduring power of faith. The Chronicles of Narnia is a literary masterpiece that continues to enchant generations of readers.",
        "publication_date": "1950-10-16",
        "price": "799.00",
        "customer_rating": "4.8",
        "count_in_stock": 10
    },
    {
        "title": "The Da Vinci Code",
        "author": "Dan Brown",
        "category": "Mystery",
        "genre": "Thriller",
        "description": "The Da Vinci Code is a gripping and thought-provoking mystery novel by Dan Brown. The story revolves around the discovery of a hidden secret that could potentially shake the foundations of religious beliefs and challenge the essence of Christianity itself.\r\n\r\nThe tale begins with the murder of Jacques Saunière, the curator of the Louvre Museum in Paris. Before he dies, Saunière leaves behind a series of mysterious codes and clues, hinting at an earth-shattering revelation he has guarded for centuries. This revelation involves the Holy Grail, the sacred relic believed to hold the bloodline of Jesus Christ.\r\n\r\nThe protagonist, Robert Langdon, a professor of symbology at Harvard University, becomes entangled in the race to decipher Saunière's cryptic messages. He joins forces with Sophie Neveu, a French cryptologist and Saunière's granddaughter, in a heart-pounding quest to unravel the Da Vinci Code and protect the ancient secret from falling into the wrong hands.\r\n\r\nAs they delve deeper into the enigmatic world of art, history, and hidden symbolism, Langdon and Sophie encounter a web of deception, conspiracy, and intrigue. Pursued by a relentless adversary, they embark on a thrilling journey through the streets of Paris, London, and beyond, unlocking the astonishing truth that has been concealed for centuries.\r\n\r\nThe Da Vinci Code is a compelling blend of historical facts, religious myths, and edge-of-your-seat suspense. It challenges readers to question conventional knowledge and ponder the realms of human history and spirituality. With its fast-paced plot and unexpected twists, the novel has become a global phenomenon, captivating readers with its intellectual depth and captivating storytelling.",
        "publication_date": "2003-03-18",
        "price": "449.00",
        "customer_rating": "4.7",
        "count_in_stock": 15
    },
    {
        "title": "The Fault in Our Stars",
        "author": "John Green",
        "category": "Fiction",
        "genre": "Young Adult",
        "description": "The Fault in Our Stars is a heart-wrenching and poignant story of love and resilience. Hazel Grace Lancaster, a teenager with cancer, meets Augustus Waters, a fellow cancer survivor, at a support group. As they navigate the challenges of their illnesses and embark on a journey to meet Hazel's favorite author, their bond deepens. John Green's beautifully written novel explores themes of mortality, love, and the search for meaning in the face of adversity. With its authentic characters, bittersweet moments, and profound insights into life and death, The Fault in Our Stars has touched the hearts of readers worldwide.",
        "publication_date": "2012-01-10",
        "price": "249.00",
        "customer_rating": "4.3",
        "count_in_stock": 3
    },
    {
        "title": "The Girl with the Dragon Tattoo",
        "author": "Stieg Larsson",
        "category": "Mystery",
        "genre": "Thriller",
        "description": "The Girl with the Dragon Tattoo is a gripping thriller that introduces readers to Lisbeth Salander, a fierce and enigmatic hacker, and Mikael Blomkvist, an investigative journalist. When the two join forces to solve the decades-old disappearance of Harriet Vanger, they uncover a web of dark secrets and corruption. Stieg Larsson's masterful storytelling, complex characters, and intricate plot twists have made this novel an international bestseller. With its themes of justice, revenge, and the power dynamics in society, The Girl with the Dragon Tattoo keeps readers on the edge of their seats.",
        "publication_date": "2005-08-01",
        "price": "299.00",
        "customer_rating": "4.4",
        "count_in_stock": 9
    },
    {
        "title": "The Giver",
        "author": "Lois Lowry",
        "category": "Fiction",
        "genre": "Dystopian",
        "description": "The Giver is a thought-provoking dystopian novel set in a seemingly utopian society where individuality and emotions have been suppressed. Jonas, a young boy, is chosen to receive memories of the past from the Giver, an elder in the community. As Jonas gains knowledge of the world's history and experiences emotions, he begins to question the restrictive nature of his society. Lois Lowry's compelling narrative explores themes of conformity, freedom, and the power of memories. The Giver is a powerful and poignant novel that challenges readers to reflect on the importance of individuality and the consequences of a seemingly perfect society.",
        "publication_date": "1993-04-26",
        "price": "249.00",
        "customer_rating": "4.6",
        "count_in_stock": 4
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "category": "Fiction",
        "genre": "Classic",
        "description": "The Great Gatsby is a tragic love story set in the opulent and glamorous world of 1920s America. The novel follows the enigmatic millionaire Jay Gatsby and his relentless pursuit of the beautiful and unattainable Daisy Buchanan.\r\n\r\nNarrated by Nick Carraway, a young man from the Midwest who moves to New York City, the story unfolds against the backdrop of the Jazz Age and the extravagance of the Roaring Twenties. As Nick becomes entangled in the lives of the wealthy elite, he bears witness to the grand parties, lavish lifestyles, and empty facades that hide the disillusionment and moral decay of the era.\r\n\r\nAt its core, The Great Gatsby is a timeless tale of love, wealth, and the American Dream. Through Gatsby's unyielding hope and desire, F. Scott Fitzgerald explores the illusion of success and the tragic consequences of unrestrained ambition.\r\n\r\nWith its poetic prose and vivid portrayal of the human condition, The Great Gatsby has become a staple of American literature and continues to resonate with readers of all generations.",
        "publication_date": "1925-04-10",
        "price": "349.00",
        "customer_rating": "4.6",
        "count_in_stock": 14
    },
    {
        "title": "The Hitchhiker's Guide to the Galaxy",
        "author": "Douglas Adams",
        "category": "Fiction",
        "genre": "Science Fiction",
        "description": "The Hitchhiker's Guide to the Galaxy is a hilarious and inventive science fiction comedy. Arthur Dent, an ordinary Earthling, finds himself swept off the planet just before its demolition to make way for a hyperspace bypass. Joined by an eclectic group of characters, including the humanoid alien Ford Prefect and the perpetually confused Marvin the Paranoid Android, Arthur embarks on a series of intergalactic misadventures. Douglas Adams' witty and irreverent narrative explores the absurdity of the universe and tackles philosophical questions with humor and wit. The Hitchhiker's Guide to the Galaxy is a beloved classic that continues to entertain readers with its blend of satire, wordplay, and cosmic absurdity.",
        "publication_date": "1979-10-12",
        "price": "249.00",
        "customer_rating": "4.5",
        "count_in_stock": 2
    },
    {
        "title": "The Hunger Games",
        "author": "Suzanne Collins",
        "category": "Fiction",
        "genre": "Science Fiction",
        "description": "The Hunger Games is a thrilling dystopian novel set in a post-apocalyptic world. In the nation of Panem, the Capitol holds an annual televised event called the Hunger Games, where young tributes from each district fight to the death. When Katniss Everdeen volunteers to take her sister's place as a tribute, she becomes a symbol of defiance against the oppressive regime. Suzanne Collins' gripping narrative explores themes of survival, sacrifice, and the power of rebellion. With its fast-paced action, complex characters, and social commentary, The Hunger Games has captivated readers of all ages and spawned a successful book and film franchise.",
        "publication_date": "2008-09-14",
        "price": "299.00",
        "customer_rating": "4.5",
        "count_in_stock": 7
    },
    {
        "title": "The Lean Startup",
        "author": "Eric Ries",
        "category": "Non-fiction",
        "genre": "Business",
        "description": "The Lean Startup is a guide to building and growing successful startups through continuous innovation. Eric Ries introduces the concept of the Lean Startup methodology, which emphasizes the importance of validating ideas through rapid experimentation and customer feedback. By applying scientific principles to the startup process, Ries argues that entrepreneurs can increase their chances of building sustainable and scalable businesses. Drawing on his own experiences and case studies, Ries provides practical advice on topics such as creating minimum viable products, conducting effective A/B testing, and implementing agile development. With its actionable insights and real-world examples, The Lean Startup is a must-read for aspiring entrepreneurs and established businesses looking to stay competitive in a rapidly changing marketplace.",
        "publication_date": "2011-09-13",
        "price": "299.00",
        "customer_rating": "4.4",
        "count_in_stock": 21
    },
    {
        "title": "The Lord of the Rings",
        "author": "J.R.R. Tolkien",
        "category": "Fiction",
        "genre": "Fantasy",
        "description": "The Lord of the Rings is an epic high fantasy trilogy that transports readers to the richly imagined world of Middle-earth. J.R.R. Tolkien's masterwork follows the perilous quest of Frodo Baggins and the Fellowship of the Ring as they journey to destroy the One Ring and defeat the dark lord Sauron. With its sprawling narrative, memorable characters, and intricate world-building, The Lord of the Rings explores themes of heroism, friendship, and the enduring struggle between good and evil. Tolkien's immersive storytelling and meticulous attention to detail have made this trilogy a timeless classic that continues to captivate readers of all ages.",
        "publication_date": "1954-07-29",
        "price": "799.00",
        "customer_rating": "4.8",
        "count_in_stock": 2
    },
    {
        "title": "The Picture of Dorian Gray",
        "author": "Oscar Wilde",
        "category": "Fiction",
        "genre": "Gothic",
        "description": "The Picture of Dorian Gray is a dark and philosophical novel that explores the nature of beauty, art, and the pursuit of pleasure. Dorian Gray, a young man of extraordinary beauty, has his portrait painted by the artist Basil Hallward. As Dorian indulges in a life of hedonism and moral corruption, his portrait ages and reflects the true state of his soul, while Dorian himself remains eternally youthful and untouched by time. Oscar Wilde's exquisitely written novel delves into themes of vanity, decadence, and the destructive power of obsession. The Picture of Dorian Gray is a haunting and morally complex masterpiece that continues to captivate readers with its exploration of the duality of human nature.",
        "publication_date": "1890-07-01",
        "price": "349.00",
        "customer_rating": "4.7",
        "count_in_stock": 5
    },
    {
        "title": "The Power of Now",
        "author": "Eckhart Tolle",
        "category": "Non-fiction",
        "genre": "Spirituality",
        "description": "The Power of Now is a guide to spiritual enlightenment and living in the present moment. Eckhart Tolle invites readers to let go of their past regrets and future anxieties and embrace the transformative power of now. Through practical teachings and personal anecdotes, Tolle explores the concept of mindfulness and its potential to liberate individuals from suffering and find inner peace. He provides practical tools and techniques for achieving a state of presence and overcoming the egoic mind. With its emphasis on mindfulness, self-awareness, and the liberation from the illusion of time, The Power of Now has become a spiritual classic and continues to inspire readers on their journey towards awakening.",
        "publication_date": "1997-09-29",
        "price": "349.00",
        "customer_rating": "4.6",
        "count_in_stock": 8
    },
    {
        "title": "The Secret Life of Bees",
        "author": "Sue Monk Kidd",
        "category": "Fiction",
        "genre": "Historical",
        "description": "The Secret Life of Bees is a moving and evocative novel set in 1960s South Carolina. It tells the story of Lily Owens, a young white girl who escapes her troubled home and finds solace in the company of three African American beekeeping sisters. As Lily uncovers the truth about her mother's past and grapples with her own identity, she discovers the power of love, forgiveness, and the resilience of the human spirit. Sue Monk Kidd's exquisite prose and vivid portrayal of the Deep South make this novel a compelling exploration of race, female empowerment, and the enduring bonds of family.",
        "publication_date": "2001-11-08",
        "price": "349.00",
        "customer_rating": "3.9",
        "count_in_stock": 3
    },
    {
        "title": "Thinking, Fast and Slow",
        "author": "Daniel Kahneman",
        "category": "Non-fiction",
        "genre": "Psychology",
        "description": "Thinking, Fast and Slow is an exploration of the two systems that drive the way we think and make decisions. Daniel Kahneman, a Nobel laureate in economics, presents decades of research on cognitive biases, heuristics, and the interplay between our intuitive and rational minds. Through engaging examples and thought experiments, Kahneman shines a light on the flaws and limitations of human judgment. He reveals the surprising ways in which our minds are prone to errors, illusions, and systematic biases. With its groundbreaking insights into human cognition, Thinking, Fast and Slow offers practical implications for understanding decision-making processes and improving our ability to navigate the complexities of life.",
        "publication_date": "2011-10-25",
        "price": "449.00",
        "customer_rating": "4.7",
        "count_in_stock": 4
    },
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "category": "Fiction",
        "genre": "Classic",
        "description": "To Kill a Mockingbird is a powerful and thought-provoking novel that addresses issues of racial injustice and moral growth in a small Southern town during the 1930s. The story is narrated by Scout Finch, a young girl who lives with her brother Jem and their widowed father Atticus Finch, a respected lawyer. The novel delves into the themes of racial prejudice, compassion, and the loss of innocence.\r\n\r\nAt the heart of the story is the trial of a black man, Tom Robinson, who is accused of raping a white woman. Atticus is appointed as Tom's defense attorney, and he stands up against the deeply ingrained racism in the community to defend an innocent man. As the trial progresses, Scout and Jem witness the harsh realities of racial discrimination and the courage it takes to fight against it.\r\n\r\nTo Kill a Mockingbird is a classic tale of empathy, understanding, and the enduring power of compassion. It has become a timeless masterpiece that continues to resonate with readers of all ages and backgrounds, reminding us of the importance of standing up for justice and equality.",
        "publication_date": "1960-07-11",
        "price": "449.00",
        "customer_rating": "4.8",
        "count_in_stock": 17
    },
    {
        "title": "To the Lighthouse",
        "author": "Virginia Woolf",
        "category": "Fiction",
        "genre": "Modernist",
        "description": "To the Lighthouse is an innovative novel that explores themes of time, perception, and the complexities of human experience. Set on the Isle of Skye, the story follows the Ramsay family and their guests as they navigate their internal thoughts and external interactions. Through shifting perspectives and introspective prose, Virginia Woolf delves into the characters' inner lives, their desires, fears, and the passage of time. With its lyrical and introspective style, To the Lighthouse challenges traditional narrative structures and provides a unique and introspective reading experience. Woolf's exploration of consciousness and the subjective nature of reality continues to fascinate and captivate readers.",
        "publication_date": "1927-05-05",
        "price": "249.00",
        "customer_rating": "4.6",
        "count_in_stock": 9
    }
]

def main():
    for book in books:
        serializer = BookSerializer(data=book)
        serializer.is_valid(raise_exception=True)
        serializer.save()
    print('Added books')

main()
