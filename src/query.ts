
const warehouse_query_params_example = {
    sparePartCode: `SP.0000`,
    sparePartConsumed: false,

}

type WHQueryParams = typeof warehouse_query_params_example
const warehouseQuery = (params: WHQueryParams) => {

    const { sparePartCode, sparePartConsumed } = params

    const query = `
with temp as (
  select 
    warehouseCode, 
    count(*) over(partition by warehouseCode) as \`count\`,
    date(timestamp_seconds(epochSeconds)) as day,
    count(*) over(partition by unix_date(date(timestamp_seconds(epochSeconds)))) as eventsCount
  from \`sparePartEventsTable\`
  where sparePartCode = ?
  and sparePartConsumed = ?
)
select distinct 'warehouseCode' type, '' || warehouseCode as value, \`count\` from temp union all
select distinct 'day', string(day), eventsCount from temp`


    return [query, sparePartCode, sparePartConsumed ]

}
