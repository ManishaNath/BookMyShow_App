**Entity-Relationship (ER) Diagram:**
*Entities and Attributes:*

**Theatre:**
Attributes: Theatre_ID (Primary Key), Theatre_name

**City:**
Attributes: City_ID (Primary Key), City_name

**Movie:**
Attributes: Movie_ID (Primary Key), Movie_name, Total_time, Genres, Language, Movie_ratings

**Ticket:**
Attributes: Ticket_ID (Primary Key)

**User:**
Attributes: User_ID (Primary Key), Username

**Screen:**
Attributes: Screen_ID (Primary Key), Screen_name, Show_ID (Foreign Key referencing ShowTable)

**Seat:**
Attributes: Seat_ID (Primary Key), Row, Number, Status

**ShowTable:**
Attributes: Show_ID (Primary Key), Show_date, Show_Time, Movie_ID (Foreign Key referencing Movie), Theatre_ID (Foreign Key referencing Theatre)

**Associations:**
*Seat to Screen (1:M):*
Seat belongs to Screen (Foreign Key: Screen_ID)
Screen has many Seat (Foreign Key: Screen_ID)

*Screen to ShowTable (1:M):*
Screen has many ShowTable (Foreign Key: Show_ID)
ShowTable belongs to Screen (Foreign Key: Screen_ID)

*ShowTable to Movie (M:1) and ShowTable to Theatre (M:1):*
ShowTable belongs to Movie (Foreign Key: Movie_ID)
ShowTable belongs to Theatre (Foreign Key: Theatre_ID)

*User to Ticket (1:M):*
User has many Ticket (Foreign Key: User_ID)
Ticket belongs to User (Foreign Key: User_ID)

*Ticket to ShowTable (M:1):*
Ticket belongs to ShowTable (Foreign Key: Show_ID)

*City to Theatre (1:M):*
City has many Theatre (Foreign Key: City_ID)
Theatre belongs to City (Foreign Key: City_ID)

*Theatre to Screen (1:M):*
Theatre has many Screen
Screen belongs to Theatre

*ShowTable to Movie (1:1):*
ShowTable has one Movie (Foreign Key: Movie_ID)
Movie belongs to ShowTable


**Part 2: Indexing for Performance**
If the API is slow, indexing can significantly improve performance. For the given scenario,we can consider indexing the following columns:

Theatre Name in Theatre table: To quickly locate theatres by name.
Datetime in Showtime table: To efficiently filter showtimes by date


To improve the performance of the API and optimize its speed, we can consider indexing columns that are frequently used in WHERE clauses of your queries. Indexing helps the database engine quickly locate and retrieve the rows that match the search conditions. Here are some suggestions for indexing:

**For ShowTable Table:**
   Index on Theatre_ID and Show_date: This helps speed up queries filtering by theatre and date.

SELECT DISTINCT DATE_FORMAT(Show_date, '%Y-%m-%d') AS Show_date
    FROM ShowTable
    WHERE Theatre_ID = :theatreID
      AND Show_date >= CURDATE()
    ORDER BY Show_date ASC
    LIMIT 7;

  --- CREATE INDEX idx_theatre_show_date ON ShowTable (Theatre_ID, Show_date);
  --- SHOW INDEX from ShowTable;
  --- EXPLAIN SELECT * FROM ShowTable WHERE Theatre_ID = :theatreID
      AND Show_date >= CURDATE()



**For Movie Table:**
   Index on Movie_ID: This helps when joining Movie with ShowTable based on Movie_ID.

SELECT
      Movie_name,
      Total_time,
      Genres,
      Language,
      Movie_ratings
    FROM Movie
    INNER JOIN ShowTable ON Movie.Movie_ID = ShowTable.Movie_ID
    WHERE ShowTable.Theatre_ID = :theatreID
      AND ShowTable.Show_date = :date;
  
  ---- CREATE INDEX idx_movie_id ON Movie (Movie_ID);
  ----SHOW INDEX from Movie;
  ----EXPLAIN SELECT * FROM Movie WHERE ShowTable.Theatre_ID = :theatreID
      AND ShowTable.Show_date = :date;

**For Theatre Table:**
   Index on Theatre_ID: This helps when joining Theatre with ShowTable based on Theatre_ID.

SELECT
      ShowTable.Show_date,
      ShowTable.Show_Time,
      Movie.Movie_name,
      Theatre.Theatre_name
    FROM ShowTable
    INNER JOIN Movie ON ShowTable.Movie_ID = Movie.Movie_ID
    INNER JOIN Theatre ON ShowTable.Theatre_ID = Theatre.Theatre_ID
    WHERE ShowTable.Show_date = :date
      AND ShowTable.Theatre_ID = :theatreID;

  --- CREATE INDEX idx_theatre_id ON Theatre (Theatre_ID);
  --- SHOW INDEX from Theatre;
  --- EXPLAIN SELECT * FROM ShowTable WHERE ShowTable.Show_date = :date
      AND ShowTable.Theatre_ID = :theatreID;


**Other Considerations:**
Check the foreign key relationships and consider indexing columns involved in joins.
Consider indexing columns used in WHERE clauses for frequently executed queries.
After adding indexes, monitor the performance and adjust as needed. It's essential to strike a balance between the number of indexes and the write performance of the database, as excessive indexing can impact insert and update operations.

**Disadvantages of Indexing:**
Write operations can potentially become slow
Complex Query plan with multiple indexes
Cautious with queries on same table
Maintenance overhead as can’t be managed via ORM’s
Additional storage space required


**Reddis:  caching data in Redis to improve API speed**

In this application, I have implemented Redis as an in-memory cache to store API responses. The middleware checks whether the requested data is present in the cache. If it is, it sends the cached data; otherwise, it proceeds to the next middleware, which fetches the data from the database. The fetched data is then stored in the Redis cache for future use.

**Why Caching is important:**

*Frequently Accessed Data:*
Cache lists of theaters, movies, and show details that are frequently accessed.
Cache mappings between IDs and corresponding names for quick lookups.

*Static Data:*
Cache data that doesn't change frequently and is used across multiple requests.

*Results of Expensive Queries:*
Cache the results of complex queries that are resource-intensive but yield the same results for repeated requests.

