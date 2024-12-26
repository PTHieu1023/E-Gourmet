package sqlbuilder

import (
	"fmt"
	"strings"
)

type QueryBuilder struct {
	columns []string
	table   string
	joins   []string
	where   []string
	groupBy []string
	having  []string
	orderBy []string
	limit   *int
	offset  *int
	cte     []string
}

func Select(columns ...string) *QueryBuilder {
	b := new(QueryBuilder)
	b.columns = append(b.columns, columns...)
	return b
}

func (b *QueryBuilder) From(tableName string) *QueryBuilder {
	b.table = tableName
	return b
}

func (b *QueryBuilder) Join(
	joinTable string,
	onCondition string,
	joinType string) *QueryBuilder {
	b.joins = append(
		b.joins,
		fmt.Sprintf("%s JOIN %s ON %s", joinType, joinTable, onCondition))
	return b
}

func (b *QueryBuilder) Where(condition string) *QueryBuilder {
	b.where = append(b.where, condition)
	return b
}

func (b *QueryBuilder) GroupBy(columns ...string) *QueryBuilder {
	b.where = append(b.where, columns...)
	return b
}

func (b *QueryBuilder) Having(condition string) *QueryBuilder {
	b.having = append(b.having, condition)
	return b
}

func (b *QueryBuilder) OrderBy(column, direction string) *QueryBuilder {
	b.orderBy = append(b.orderBy, fmt.Sprintf("%s %s", column, direction))
	return b
}

func (b *QueryBuilder) Limit(limit int) *QueryBuilder {
	b.limit = &limit
	return b
}

func (b *QueryBuilder) Offset(offset int) *QueryBuilder {
	b.offset = &offset
	return b
}

func (b *QueryBuilder) With(cteName, cteQuery string) *QueryBuilder {
	b.cte = append(b.cte, fmt.Sprintf("WITH %s AS (%s)", cteName, cteQuery))
	return b
}

func (b *QueryBuilder) Build() string {
	var queryBuilder strings.Builder

	// CTEs (Common Table Expressions)
	if len(b.cte) > 0 {
		queryBuilder.WriteString(strings.Join(b.cte, ", "))
		queryBuilder.WriteString(" ")
	}

	// SELECT clause
	queryBuilder.WriteString("SELECT ")
	if len(b.columns) > 0 {
		queryBuilder.WriteString(strings.Join(b.columns, ", "))
	} else {
		queryBuilder.WriteString("*")
	}

	// FROM clause
	queryBuilder.WriteString(" FROM " + b.table)

	// Joins
	if len(b.joins) > 0 {
		queryBuilder.WriteString(" " + strings.Join(b.joins, " "))
	}

	// WHERE clause
	if len(b.where) > 0 {
		queryBuilder.WriteString(" WHERE " + strings.Join(b.where, " AND "))
	}

	// GROUP BY clause
	if len(b.groupBy) > 0 {
		queryBuilder.WriteString(" GROUP BY " + strings.Join(b.groupBy, ", "))
	}

	// HAVING clause
	if len(b.having) > 0 {
		queryBuilder.WriteString(" HAVING " + strings.Join(b.having, " AND "))
	}

	// ORDER BY clause
	if len(b.orderBy) > 0 {
		queryBuilder.WriteString(" ORDER BY " + strings.Join(b.orderBy, ", "))
	}

	// LIMIT clause
	if b.limit != nil {
		queryBuilder.WriteString(fmt.Sprintf(" LIMIT %d", *b.limit))
	}

	// OFFSET clause
	if b.offset != nil {
		queryBuilder.WriteString(fmt.Sprintf(" OFFSET %d", *b.offset))
	}

	return queryBuilder.String()
}

func (b *QueryBuilder) SubQuery() string {
	return "(" + b.Build() + ")"
}
