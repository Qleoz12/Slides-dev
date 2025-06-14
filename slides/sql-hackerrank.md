---
theme: seriph
background: https://cover.sli.dev
title: HackerRank SQL Challenge Solutions
info: |
  ## HackerRank SQL Challenge Series  
  Professional SQL problem-solving walkthroughs, visualized in Slidev.

  Follow for more on [LinkedIn](https://www.linkedin.com).
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true

---

# 🧠 HackerRank SQL Challenge Solutions

---

## 🌍 Average Population of Each Continent

**Problem**:  
https://www.hackerrank.com/challenges/average-population-of-each-continent/problem

**Description**:  
Query the names of all continents and their average city populations (rounded down). Use `FLOOR()` and join `CITY` with `COUNTRY`.

```sql
SELECT co.continent,  
       FLOOR(AVG(c.population)) AS average_population
FROM city c
JOIN country co ON c.countrycode = co.code
GROUP BY co.continent;
```

✅ *Accurately joins and groups data to calculate the average population per continent.*

---

## 🏆 Contest Leaderboard

**Problem**:  https://www.hackerrank.com/challenges/contest-leaderboard/problem

**Description**:  
Calculate each hacker’s total score by summing their maximum scores for each challenge. Exclude hackers with 0 score.

```sql
SELECT h.hacker_id, h.name, SUM(max_score) AS total_score
FROM Hackers h
JOIN (
    SELECT hacker_id, challenge_id, MAX(score) AS max_score
    FROM Submissions
    GROUP BY hacker_id, challenge_id
) s ON h.hacker_id = s.hacker_id
GROUP BY h.hacker_id, h.name
HAVING total_score > 0
ORDER BY total_score DESC, h.hacker_id;
```

✅ *Finds each hacker’s best submission per challenge and sums them.*

---

#### 🛠️ Query Breakdown

- Get MAX(score) per hacker/challenge.
- JOIN with Hackers.
- GROUP BY hacker.
- Filter zero scores with `HAVING`.
- Order by score descending, hacker_id ascending.

---

## 🔢 Prime Numbers (MySQL 5.7)

**Problem**:  
Generate all prime numbers from 2 to 1000, concatenated using `&`.

**Description**:  
Use user-defined variables and `NOT EXISTS` to simulate logic for checking primality.

---

```sql
SET @row := 0;
SET @i := 0;

SELECT GROUP_CONCAT(prime_numbers.n ORDER BY prime_numbers.n SEPARATOR '&') AS prime_numbers
FROM (
    SELECT candidate_numbers.N AS n
    FROM (
        SELECT @row := @row + 1 AS N
        FROM information_schema.tables t1
        CROSS JOIN information_schema.tables t2
        LIMIT 1000
    ) candidate_numbers
    WHERE candidate_numbers.N > 1
      AND NOT EXISTS (
        SELECT 1
        FROM (
            SELECT @i := @i + 1 AS num
            FROM information_schema.tables
            LIMIT 1000
        ) AS numbers
        WHERE numbers.num < candidate_numbers.N
          AND MOD(candidate_numbers.N, numbers.num) = 0
    )
) AS prime_numbers;
```

✅ *Simulates loop with SQL logic for prime generation.*

---

### 🛠️ Breakdown

- `@row := @row + 1`: Simulates a **counter** to generate numbers 1 to 1000.
- `CROSS JOIN information_schema.tables t2`: Creates a **huge virtual table** to simulate looping behavior.
- **Subquery 1 (candidate_numbers)**:
  - Generates candidate numbers from 1 to 1000 using the simulated loop.
- **Subquery 2 (numbers)**:
  - For each candidate, checks for all numbers less than it that could divide it.
- `NOT EXISTS (...)`: If any number divides the candidate → it's **not prime**, so exclude it.
- `GROUP_CONCAT`: Combines all valid primes into a single string, separated by `&`.

---


## 🔢 Print Prime Numbers (MySQL 8+)

**Problem**: https://www.hackerrank.com/challenges/print-prime-numbers/problem

**Description**:  <AutoFitText :max="15" :min="10" modelValue="Use recursive CTEs to generate prime numbers up to 1000 in one SQL statement."/>
```sql
WITH RECURSIVE numbers AS (
    SELECT 2 AS n UNION ALL
    SELECT n + 1 FROM numbers WHERE n < 1000
),divisors AS (
    SELECT 2 AS d UNION ALL
    SELECT d + 1 FROM divisors WHERE d < 500
)
SELECT GROUP_CONCAT(n ORDER BY n SEPARATOR '&') AS result
FROM (
    SELECT n FROM numbers
    WHERE NOT EXISTS (
        SELECT 1 FROM divisors WHERE d < n AND n % d = 0
    )
) AS primes;
```
💡 *Elegant and fast solution using recursive CTE.*

---

## 🔺 Triangle Pattern

**Problem**: https://www.hackerrank.com/challenges/draw-the-triangle-1/problem

**Description**:  
Print a triangle of asterisks decreasing from 20 to 1 using user-defined variables and cross-joins.

```sql
SELECT REPEAT('* ', n) AS pattern
FROM (
    SELECT @row := @row - 1 AS n
    FROM (SELECT 0 UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 
          UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a,
         (SELECT 0 UNION SELECT 1) b,
         (SELECT @row := 21) init
    LIMIT 20
) AS numbers
ORDER BY 1;
```

---

## 🛠️ Breakdown

- Uses a REPEAT function to repeat '*' symbols.
- Generates numbers from 20 to 1 using a variable and Cartesian joins.
- Limits output to 20 rows for triangle shape.

---

## 🧮 Interviews Challenge

**Problem**: https://www.hackerrank.com/challenges/interviews/problem

**Description**:  
Aggregate total submissions, acceptances, and views per contest. Only show rows with non-zero data.

---

```sql
SELECT 
  c.contest_id, c.hacker_id, c.name,SUM(COALESCE(ss.total_submissions,0)) AS total_submissions,
  SUM(COALESCE(ss.total_accepted_submissions,0)) AS total_accepted_submissions,
  SUM(COALESCE(vs.total_views,0)) AS total_views,SUM(COALESCE(vs.total_unique_views,0)) AS total_unique_views
FROM contests c
JOIN colleges col ON c.contest_id = col.contest_id 
JOIN challenges ch ON col.college_id = ch.college_id
LEFT JOIN (
  SELECT challenge_id, SUM(total_submissions) AS total_submissions, 
         SUM(total_accepted_submissions) AS total_accepted_submissions
  FROM submission_stats GROUP BY challenge_id
) ss ON ch.challenge_id = ss.challenge_id
LEFT JOIN (
  SELECT challenge_id, SUM(total_views) AS total_views, 
         SUM(total_unique_views) AS total_unique_views
  FROM view_stats GROUP BY challenge_id
) vs ON ch.challenge_id = vs.challenge_id
GROUP BY c.contest_id, c.hacker_id, c.name
HAVING SUM(COALESCE(ss.total_submissions,0)) > 0
    OR SUM(COALESCE(ss.total_accepted_submissions,0)) > 0
    OR SUM(COALESCE(vs.total_views,0)) > 0
    OR SUM(COALESCE(vs.total_unique_views,0)) > 0
ORDER BY c.hacker_id, c.contest_id;
```

---

## 🛠️ Breakdown

- Joins contests, colleges, challenges, and views/submissions.
- Uses subqueries to pre-aggregate submission and view stats.
- Filters to only active contests using HAVING clause.
- Uses COALESCE to handle nulls from LEFT JOINs.

---

## 🔁 Symmetric Pairs

**Problem**: https://www.hackerrank.com/challenges/symmetric-pairs/problem

**Description**:  
Return all (x, y) pairs where (y, x) also exists. Avoid duplicates and ensure order.

```sql
SELECT a.x, a.y
FROM Functions a 
JOIN Functions b 
  ON a.x = b.y AND a.y = b.x
GROUP BY a.x, a.y
HAVING COUNT(*) > 1 OR a.x < a.y
ORDER BY a.x;
```

---

## 🛠️ Breakdown

- Performs self-join to check for reverse (y,x) pairs.
- Uses HAVING to filter duplicates (ensures one row per symmetric pair).
- ORDER BY ensures consistent output.

---

## 🎓 Placements

**Problem**: https://www.hackerrank.com/challenges/placements/problem

**Description**:  
Return names of students whose best friends received a higher salary offer.

```sql
SELECT s.name
FROM Students s
JOIN Friends f ON s.id = f.id
JOIN Packages p1 ON s.id = p1.id
JOIN Packages p2 ON f.friend_id = p2.id
WHERE p2.salary > p1.salary
ORDER BY p2.salary;
```

---

## 🛠️ Breakdown

- Compares student and their best friend salaries using JOINs.
- Filters results where the friend’s offer is higher.
- Outputs name of the underpaid student.

---

## 📆 15 Days of Learning SQL

**Problem**: https://www.hackerrank.com/challenges/15-days-of-learning-sql/problem

**Description**:  
Report for each day:
- Number of distinct hackers
- Hacker with most submissions

---

```sql
WITH daily AS (
  SELECT submission_date, hacker_id, COUNT(*) AS submissions
  FROM Submissions
  GROUP BY submission_date, hacker_id
)
SELECT d.submission_date,
       (SELECT COUNT(DISTINCT hacker_id) FROM daily d2 WHERE d2.submission_date = d.submission_date) AS total_hackers,
       d.hacker_id, h.name
FROM daily d
JOIN Hackers h ON h.hacker_id = d.hacker_id
JOIN (
     SELECT submission_date, MAX(submissions) AS max_subs
     FROM daily
     GROUP BY submission_date
) m ON m.submission_date = d.submission_date AND d.submissions = m.max_subs
ORDER BY d.submission_date, d.hacker_id;
```

---

## 🛠️ Breakdown

- CTE **daily** counts submissions per hacker per day.  
- Inline view **m** picks the max submissions for each day.  
- Join back to filter top submitters.  
- Sub‑query counts distinct hackers per date.


---

## 📦 SQL Projects — Consecutive Tasks

**Problem**: https://www.hackerrank.com/challenges/sql-projects/problem

**Description**:  
Output start and end dates for chains of consecutive projects.

```sql
SELECT Start_Date,
       MIN(End_Date) AS End_Date
FROM (
  SELECT a.Start_Date, b.End_Date
  FROM (SELECT Start_Date FROM Projects WHERE Start_Date NOT IN (SELECT End_Date FROM Projects)) a
  CROSS JOIN (SELECT End_Date FROM Projects WHERE End_Date NOT IN (SELECT Start_Date FROM Projects)) b
  WHERE a.Start_Date < b.End_Date
) pairs
GROUP BY Start_Date
ORDER BY DATEDIFF(Start_Date, MIN(End_Date)) DESC, Start_Date;
```

---

## 🛠️ Breakdown

- Filters for project boundaries.
- Uses CROSS JOIN to pair potential ranges.
- Filters and groups to find chains.

---

## 🎯 Challenges Created

**Problem**: https://www.hackerrank.com/challenges/challenges/problem

**Description**:  
Return hackers with the most or uniquely high number of challenges created.

```sql
WITH tallies AS (
  SELECT c.hacker_id, h.name, COUNT(*) AS n
  FROM Challenges c
  JOIN Hackers h ON h.hacker_id = c.hacker_id
  GROUP BY c.hacker_id, h.name
),
max_n AS (SELECT MAX(n) AS mx FROM tallies)
SELECT *
FROM tallies, max_n
WHERE n = mx
   OR n IN (SELECT n FROM tallies GROUP BY n HAVING COUNT(*) = 1)
ORDER BY n DESC, hacker_id;
```

---

## 🛠️ Breakdown

- Counts challenges per hacker.
- Keeps only the highest and unique counts.
- Uses CTEs for clarity and reuse.

---

## 🪄 Harry Potter & Wands

**Problem**: https://www.hackerrank.com/challenges/harry-potter-and-wands/problem

**Description**:  
Return id, age, coins, and power for lowest-cost wands for non-evil (age, power) pairs.

```sql
WITH min_cost AS (
  SELECT w.power, p.age, MIN(w.coins_needed) AS min_coins
  FROM Wands w
  JOIN Wands_Property p ON p.code = w.code
  WHERE p.is_evil = 0
  GROUP BY w.power, p.age
)
SELECT w.id, p.age, w.coins_needed, w.power
FROM Wands w
JOIN Wands_Property p ON p.code = w.code
JOIN min_cost m ON m.power = w.power AND m.age = p.age AND m.min_coins = w.coins_needed
WHERE p.is_evil = 0
ORDER BY w.power DESC, p.age DESC;
```

---

## 🛠️ Breakdown

- CTE selects the minimum coins needed per (age, power).
- Joins again to filter only those minimum-cost wands.
- Filters evil wands out.

---

## 🌳 BST Node Type

**Problem**: https://www.hackerrank.com/challenges/binary-search-tree-1/problem

```sql
SELECT N,
  CASE
    WHEN P IS NULL THEN 'Root'
    WHEN N IN (SELECT DISTINCT P FROM BST WHERE P IS NOT NULL) THEN 'Inner'
    ELSE 'Leaf'
  END AS node_type
FROM BST
ORDER BY N;
```

## 🛠️ Breakdown

- `P IS NULL` → Root
- Appears in P column → Inner
- Else → Leaf

---


## 🏢 The Company Hierarchy

**Problem**  
https://www.hackerrank.com/challenges/the-company/problem

**Description**:  
Return `company_code, founder, #lead_managers, #senior_managers, #managers, #employees`, sorted by `company_code`.

---


```sql
SELECT e.company_code,
       c.founder,
       COUNT(DISTINCT lm.lead_manager_code)    AS lead_mgrs,
       COUNT(DISTINCT sm.senior_manager_code)  AS senior_mgrs,
       COUNT(DISTINCT m.manager_code)          AS managers,
       COUNT(DISTINCT e.employee_code)         AS employees
FROM Employee e
JOIN Company c      ON c.company_code = e.company_code
LEFT JOIN Lead_Manager   lm ON lm.company_code = e.company_code
LEFT JOIN Senior_Manager sm ON sm.company_code = e.company_code
LEFT JOIN Manager        m  ON m.company_code  = e.company_code
GROUP BY e.company_code, c.founder
ORDER BY e.company_code;
```

---

## 🛠️ Breakdown

- Joins employees to their respective managerial layers using LEFT JOINs.
- Uses `COUNT(DISTINCT ...)` to count unique individuals at each level.
- Groups by company and founder to return a row per company.

---

## 🌤️ Weather Observation Station 5

**Problem**: https://www.hackerrank.com/challenges/weather-observation-station-5/problem

**Description**:  
Return the **shortest** and **longest** city names in `STATION`, together with their lengths.

```sql
SELECT CITY, LENGTH(CITY) AS len
FROM   STATION
WHERE  CITY IN (
         (SELECT CITY FROM STATION ORDER BY LENGTH(CITY), CITY LIMIT 1)
         UNION ALL
         (SELECT CITY FROM STATION ORDER BY LENGTH(CITY) DESC, CITY LIMIT 1)
       );
```

---

## 🛠️ Breakdown

- Two ordered subqueries fetch the shortest and longest cities alphabetically.
- `UNION ALL` combines them into a single result.
- Uses LENGTH to measure city name size.

---

## 🏅 Full Score (>1 Challenge)

**Problem**: https://www.hackerrank.com/challenges/full-score/problem

**Description**:  
Count hackers with **full score submissions** in more than one challenge.

---
 

```sql
WITH full AS (
  SELECT s.hacker_id
  FROM   Submissions  s
  JOIN   Challenges   c USING (challenge_id)
  JOIN   Difficulty   d USING (difficulty_level)
  WHERE  s.score = d.score
  GROUP  BY s.hacker_id, s.challenge_id
),
tally AS (
  SELECT hacker_id, COUNT(*) AS n
  FROM   full
  GROUP  BY hacker_id
  HAVING COUNT(*) > 1
)
SELECT t.hacker_id, h.name
FROM   tally t
JOIN   Hackers h USING (hacker_id)
ORDER  BY t.n DESC, t.hacker_id;
```

---

## 🛠️ Breakdown

- Filters full score rows via `score = d.score`.
- Groups by hacker to count multiple full scores.
- Joins hacker names and orders by count and ID.

---

## 📄 The Report (Students & Grades)

**Problem**: https://www.hackerrank.com/challenges/the-report/problem

**Description**:  
Output Name / Grade / Mark, masking names with NULL for grades < 8.

```sql
SELECT
  CASE WHEN g.grade < 8 THEN 'NULL' ELSE s.name END AS name,
  g.grade,
  s.marks
FROM   Students s
JOIN   Grades   g
  ON   s.marks BETWEEN g.min_mark AND g.max_mark
ORDER  BY g.grade DESC,
         CASE WHEN g.grade < 8 THEN s.marks ELSE s.name END,
         s.marks;
```

---

## 🛠️ Breakdown

- Uses CASE to anonymize students with grades below 8.
- Matches marks to grades via BETWEEN.
- Orders by grade descending, then by name or marks conditionally.

---

## 💰 City‑Product Spend
**Problem**: https://www.hackerrank.com/challenges/the-report/problem?isFullScreen=true
**Description**:  
For every (city, product) pair, return total spend amount.

```sql
SELECT
  ci.city_name,
  p.product_name,
  ROUND(SUM(ii.line_total_price), 2) AS amount_spent
FROM       invoice_item ii
JOIN       invoice      i  ON i.id      = ii.invoice_id
JOIN       customer     cu ON cu.id     = i.customer_id
JOIN       city         ci ON ci.id     = cu.city_id
JOIN       product      p  ON p.id      = ii.product_id
GROUP BY   ci.city_name, p.product_name
ORDER BY   amount_spent DESC,
           ci.city_name,
           p.product_name;
```

---

## 🛠️ Breakdown

- Joins invoice items back to customer and city tables.
- Aggregates sales per city/product combo.
- Orders by spend, then alphabetically.

---

## 🌡️ Monthly Temperature Summary
**Problem**: test challenge
**Description**:  
Aggregate max, min, and average monthly temperatures.

```sql
SELECT
  DATE_FORMAT(record_date, '%Y-%m') AS y_m,
  MAX(CASE WHEN data_type = 'max' THEN data_value END) AS max_temp,
  MIN(CASE WHEN data_type = 'min' THEN data_value END) AS min_temp,
  ROUND(AVG(CASE WHEN data_type = 'avg' THEN data_value END), 0) AS avg_temp
FROM temperature_records
GROUP BY YEAR(record_date), MONTH(record_date)
ORDER BY y_m;
```

---

## 🛠️ Breakdown

- Uses CASE inside aggregate functions to pivot rows to columns.
- Groups by month using YEAR + MONTH from date.
- Outputs formatted year-month strings.

---

## ⏱️ Hours Worked per Day → Total per Employee
**Problem**: test challenge
**Description**:  
Compute hours between first & last timestamp each day, then sum per employee.

```sql
WITH daily AS (
  SELECT
    emp_id,
    DATE(timestamp) AS work_date,
    TIMESTAMPDIFF(
      HOUR,
      MIN(timestamp),
      MAX(timestamp)
    ) AS hours
  FROM attendance
  GROUP BY emp_id, DATE(timestamp)
)
SELECT emp_id,
       SUM(hours) AS total_hours
FROM   daily
GROUP  BY emp_id
ORDER  BY emp_id;
```

---

## 🛠️ Breakdown

- CTE calculates time difference between first and last entry per day.
- Outer query sums daily values per employee.
- Uses TIMESTAMPDIFF for hourly difference.

---
layout: image
class: text-center
image: https://raw.githubusercontent.com/Qleoz12/Slides-dev/refs/heads/master/funnyPictures/mr-robot.webp
---

<div style="background: rgba(0, 0, 0, 0.6); padding: 2rem; border-radius: 1rem; display: inline-block;">
  <div style="font-size: 2.5rem; font-weight: bold; color: #ffe600; margin-bottom: 0.5rem;">
    😅 After all that knowledge…
  </div>
  <div style="font-size: 2rem; font-weight: 500; color: #ffffff;">
    You still have to explain HR how you know SQL.
  </div>
</div>

---