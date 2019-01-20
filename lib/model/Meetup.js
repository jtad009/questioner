module.export = (topic,location,images,tags,happeningOn,created) => {
    return {
        topic : topic || 'Not Set',
        location: location || 'Not set',
        images: images || [],
        tags: tags || [],
        happeningOn: happeningOn || 'Not Set',
        created: created || 'Not Set'
    }
}